import Foundation
import SwiftUI

struct PriceResult: Identifiable, Decodable {
    let store: String
    let price: Double
    let logo: String
    let inStock: Bool
    let url: String

    var id: String { "\(store)-\(price)" }
}

struct ProductResult: Decodable, Identifiable {
    let barcode: String
    let name: String
    let brand: String
    let image: String
    let offers: [PriceResult]
    let dealScore: DealScore
    let avgPrice90Day: Double
    let inStorePrice: Double

    var id: String { barcode }
}

enum DealScore: String, Decodable {
    case great
    case good
    case fair
    case overpriced

    var label: String {
        switch self {
        case .great: return "GREAT DEAL"
        case .good: return "GOOD DEAL"
        case .fair: return "FAIR PRICE"
        case .overpriced: return "OVERPRICED"
        }
    }

    var color: Color {
        switch self {
        case .great: return .green
        case .good: return Color(red: 0.4, green: 0.9, blue: 0.4)
        case .fair: return .orange
        case .overpriced: return .red
        }
    }

    var icon: String {
        switch self {
        case .great: return "star.fill"
        case .good: return "checkmark.circle.fill"
        case .fair: return "minus.circle.fill"
        case .overpriced: return "exclamationmark.circle.fill"
        }
    }
}

let previewProduct = ProductResult(
    barcode: "049000028904",
    name: "Purified Water 20 oz",
    brand: "Dasani",
    image: "dasani",
    offers: [
        PriceResult(store: "Walmart", price: 1.28, logo: "cart.fill",        inStock: true,  url: "https://www.walmart.com/search?q=Dasani%20Water"),
        PriceResult(store: "Target",  price: 1.49, logo: "target",           inStock: true,  url: "https://www.target.com/s?searchTerm=Dasani%20Water"),
        PriceResult(store: "Amazon",  price: 1.67, logo: "shippingbox.fill", inStock: true,  url: "https://www.amazon.com/s?k=Dasani%20Water"),
        PriceResult(store: "eBay",    price: 0.99, logo: "tag.fill",         inStock: false, url: "https://www.ebay.com/sch/i.html?_nkw=Dasani%20Water"),
    ],
    dealScore: .great,
    avgPrice90Day: 1.79,
    inStorePrice: 2.49
)

let apiBaseURL = "http://172.16.135.121:3000"

struct ResultView: View {
    let barcode: String
    @Environment(\.dismiss) var dismiss
    @State private var product: ProductResult?
    @State private var errorMessage: String?
    @State private var isLoading = true
    @State private var showWatchlist = false

    var sortedPrices: [PriceResult] {
        (product?.offers ?? []).sorted {
            if $0.inStock != $1.inStock {
                return $0.inStock && !$1.inStock
            }

            return $0.price < $1.price
        }
    }

    var bestOffer: PriceResult? {
        sortedPrices.first { $0.inStock }
    }

    var bestPrice: Double {
        bestOffer?.price ?? 0
    }

    var savings: Double {
        (product?.avgPrice90Day ?? 0) - bestPrice
    }

    var body: some View {
        ZStack {
            Color(white: 0.96).ignoresSafeArea()

            if isLoading {
                ProgressView("Loading prices...")
                    .tint(.green)
                    .foregroundColor(.black)
            } else if let errorMessage {
                VStack(spacing: 16) {
                    Text(errorMessage)
                        .foregroundColor(.black)
                        .multilineTextAlignment(.center)

                    Button("Try Again") {
                        Task {
                            await loadProduct()
                        }
                    }
                    .foregroundColor(.black)
                    .padding(.horizontal, 20)
                    .padding(.vertical, 12)
                    .background(Color.green)
                    .cornerRadius(12)
                }
                .padding(.horizontal, 24)
            } else if let product {
                ScrollView {
                    VStack(spacing: 24) {
                        headerSection(product: product)
                        dealBadge(product: product)
                        priceCards
                        shelfVsOnline(product: product)
                        priceHistoryBar(product: product)
                        buyNowButton
                        watchlistButton
                        Spacer(minLength: 40)
                    }
                    .padding(.horizontal, 20)
                    .padding(.top, 20)
                }
            }
        }
        .navigationBarBackButtonHidden(true)
        .task(id: barcode) {
            await loadProduct()
        }
        .navigationDestination(isPresented: $showWatchlist) {
            WatchlistView()
        }
        .toolbar {
            ToolbarItem(placement: .navigationBarLeading) {
                Button(action: { dismiss() }) {
                    HStack(spacing: 6) {
                        Image(systemName: "chevron.left")
                        Text("Scan Again")
                    }
                    .foregroundColor(.green)
                }
            }
        }
    }

    func headerSection(product: ProductResult) -> some View {
        VStack(alignment: .leading, spacing: 14) {
            Image(product.image)
                .resizable()
                .scaledToFill()
                .frame(maxWidth: .infinity)
                .frame(height: 240)
                .clipped()
                .background(Color.white)
                .cornerRadius(16)

            VStack(alignment: .leading, spacing: 6) {
                Text(product.brand.uppercased())
                    .font(.system(size: 12, weight: .semibold))
                    .foregroundColor(.green)
                    .tracking(2)

                Text(product.name)
                    .font(.system(size: 24, weight: .bold))
                    .foregroundColor(.black)

                Text("Barcode: \(product.barcode)")
                    .font(.system(size: 12))
                    .foregroundColor(.gray)
            }
        }
        .padding(16)
        .background(Color.white)
        .cornerRadius(16)
    }

    func dealBadge(product: ProductResult) -> some View {
        HStack(spacing: 12) {
            Image(systemName: product.dealScore.icon)
                .font(.system(size: 28))
                .foregroundColor(product.dealScore.color)

            VStack(alignment: .leading, spacing: 4) {
                Text(product.dealScore.label)
                    .font(.system(size: 18, weight: .bold))
                    .foregroundColor(product.dealScore.color)

                if savings > 0 {
                    Text("$\(String(format: "%.2f", savings)) below 90-day average")
                        .font(.system(size: 13))
                        .foregroundColor(.gray)
                }
            }

            Spacer()

            VStack(alignment: .trailing, spacing: 2) {
                Text(bestOffer == nil ? "No stock" : "Best price")
                    .font(.system(size: 11))
                    .foregroundColor(.gray)
                Text(bestOffer == nil ? "--" : "$\(String(format: "%.2f", bestPrice))")
                    .font(.system(size: 26, weight: .bold))
                    .foregroundColor(.black)
            }
        }
        .padding(16)
        .background(product.dealScore.color.opacity(0.12))
        .overlay(
            RoundedRectangle(cornerRadius: 16)
                .stroke(product.dealScore.color.opacity(0.3), lineWidth: 1)
        )
        .cornerRadius(16)
    }

    var priceCards: some View {
        VStack(spacing: 1) {
            Text("PRICES")
                .font(.system(size: 11, weight: .semibold))
                .foregroundColor(.gray)
                .tracking(2)
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(.bottom, 8)

            ForEach(sortedPrices) { result in
                priceRow(result: result, isBest: result.id == bestOffer?.id)
            }
        }
    }

    func priceRow(result: PriceResult, isBest: Bool) -> some View {
        HStack(spacing: 14) {
            ZStack {
                Circle()
                    .fill(isBest ? Color.green.opacity(0.15) : Color(white: 0.93))
                    .frame(width: 40, height: 40)
                Image(systemName: result.logo)
                    .font(.system(size: 16))
                    .foregroundColor(isBest ? .green : .gray)
            }

            Text(result.store)
                .font(.system(size: 16, weight: isBest ? .semibold : .regular))
                .foregroundColor(.black)

            Spacer()

            if !result.inStock {
                Text("Out of stock")
                    .font(.system(size: 12))
                    .foregroundColor(.gray)
            }

            Text("$\(String(format: "%.2f", result.price))")
                .font(.system(size: 18, weight: .bold))
                .foregroundColor(isBest ? .green : (result.inStock ? .black : .gray))

            if isBest {
                Text("BEST")
                    .font(.system(size: 10, weight: .bold))
                    .foregroundColor(.black)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(Color.green)
                    .cornerRadius(6)
            }
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 14)
        .background(isBest ? Color.green.opacity(0.08) : Color.white)
        .cornerRadius(12)
        .padding(.bottom, 2)
    }

    func shelfVsOnline(product: ProductResult) -> some View {
        let vsShelf = product.inStorePrice - bestPrice
        return VStack(alignment: .leading, spacing: 12) {
            Text("SHELF VS ONLINE")
                .font(.system(size: 11, weight: .semibold))
                .foregroundColor(.gray)
                .tracking(2)

            HStack {
                VStack(alignment: .leading, spacing: 4) {
                    Text("This store")
                        .font(.system(size: 12))
                        .foregroundColor(.gray)
                    Text("$\(String(format: "%.2f", product.inStorePrice))")
                        .font(.system(size: 18, weight: .bold))
                        .foregroundColor(.black)
                }
                Spacer()
                VStack(alignment: .trailing, spacing: 4) {
                    Text("Best online")
                        .font(.system(size: 12))
                        .foregroundColor(.gray)
                    Text("$\(String(format: "%.2f", bestPrice))")
                        .font(.system(size: 18, weight: .bold))
                        .foregroundColor(.green)
                }
            }

            if vsShelf > 0, bestOffer != nil {
                Text("Online is $\(String(format: "%.2f", vsShelf)) cheaper than this store.")
                    .font(.system(size: 13))
                    .foregroundColor(.gray)
            }
        }
        .padding(16)
        .background(Color.white)
        .cornerRadius(16)
    }

    func priceHistoryBar(product: ProductResult) -> some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("90-DAY AVERAGE")
                .font(.system(size: 11, weight: .semibold))
                .foregroundColor(.gray)
                .tracking(2)

            HStack {
                Text("Avg: $\(String(format: "%.2f", product.avgPrice90Day))")
                    .foregroundColor(.black)
                    .font(.system(size: 15))
                Spacer()
                let pct = product.avgPrice90Day > 0
                    ? Int(((product.avgPrice90Day - bestPrice) / product.avgPrice90Day) * 100)
                    : 0
                if pct > 0, bestOffer != nil {
                    Text("\(pct)% below average")
                        .foregroundColor(.green)
                        .font(.system(size: 14, weight: .semibold))
                }
            }

            GeometryReader { geo in
                ZStack(alignment: .leading) {
                    RoundedRectangle(cornerRadius: 4)
                        .fill(Color(white: 0.9))
                        .frame(height: 8)

                    RoundedRectangle(cornerRadius: 4)
                        .fill(Color.green)
                        .frame(
                            width: geo.size.width * CGFloat(product.avgPrice90Day > 0 ? min(bestPrice / product.avgPrice90Day, 1) : 0),
                            height: 8
                        )
                }
            }
            .frame(height: 8)

            Text("Great deal: more than 10% below this average.")
                .font(.system(size: 13))
                .foregroundColor(.gray)
        }
        .padding(16)
        .background(Color.white)
        .cornerRadius(16)
    }

    var buyNowButton: some View {
        Group {
            if let offer = bestOffer, let url = URL(string: offer.url) {
                Link(destination: url) {
                    HStack(spacing: 10) {
                        Image(systemName: "cart.fill")
                            .font(.system(size: 18))
                        Text("Buy now · \(offer.store) $\(String(format: "%.2f", offer.price))")
                            .font(.system(size: 17, weight: .semibold))
                    }
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 18)
                    .background(Color.green)
                    .cornerRadius(16)
                }
            }
        }
    }

    var watchlistButton: some View {
        Button(action: {
            showWatchlist = true
        }) {
            HStack(spacing: 10) {
                Image(systemName: "bell.badge")
                    .font(.system(size: 18))
                Text("Alert me when price drops")
                    .font(.system(size: 17, weight: .semibold))
            }
            .foregroundColor(.green)
            .frame(maxWidth: .infinity)
            .padding(.vertical, 18)
            .background(Color.white)
            .overlay(
                RoundedRectangle(cornerRadius: 16)
                    .stroke(Color.green, lineWidth: 1.5)
            )
            .cornerRadius(16)
        }
    }

    func loadProduct() async {
        if ProcessInfo.processInfo.environment["XCODE_RUNNING_FOR_PREVIEWS"] == "1" {
            product = previewProduct
            errorMessage = nil
            isLoading = false
            return
        }

        var lookup = barcode.filter(\.isNumber)
        if lookup.count < 8 || lookup.count > 14 {
            lookup = "049000028904"
        }

        guard let url = URL(string: "\(apiBaseURL)/products/\(lookup)") else {
            errorMessage = "Invalid product URL."
            isLoading = false
            return
        }

        isLoading = true
        errorMessage = nil

        do {
            let (data, response) = try await URLSession.shared.data(from: url)
            guard let httpResponse = response as? HTTPURLResponse else {
                errorMessage = "Could not reach the server."
                isLoading = false
                return
            }

            guard httpResponse.statusCode == 200 else {
                errorMessage = httpResponse.statusCode == 404
                    ? "No product found for this barcode."
                    : "Could not load product details."
                isLoading = false
                return
            }

            product = try JSONDecoder().decode(ProductResult.self, from: data)
            isLoading = false
        } catch {
            errorMessage = "Could not connect to the local API."
            isLoading = false
        }
    }
}

#Preview {
    NavigationStack {
        ResultView(barcode: previewProduct.barcode)
    }
}
