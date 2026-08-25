import SwiftUI

struct CatalogView: View {
    @State private var products: [ProductResult] = []
    @State private var errorMessage: String?

    var body: some View {
        ZStack {
            Color(white: 0.96).ignoresSafeArea()

            if let errorMessage {
                Text(errorMessage)
                    .foregroundColor(.black)
                    .padding()
            } else if products.isEmpty {
                ProgressView()
                    .tint(.green)
            } else {
                ScrollView {
                    VStack(spacing: 12) {
                        ForEach(products) { product in
                            NavigationLink {
                                ResultView(barcode: product.barcode)
                            } label: {
                                catalogRow(product)
                            }
                        }
                    }
                    .padding(20)
                }
            }
        }
        .navigationTitle("Samples")
        .navigationBarTitleDisplayMode(.inline)
        .task {
            await loadCatalog()
        }
    }

    func catalogRow(_ product: ProductResult) -> some View {
        HStack(spacing: 12) {
            Image(product.image)
                .resizable()
                .scaledToFill()
                .frame(width: 72, height: 72)
                .clipped()
                .background(Color.white)
                .cornerRadius(10)

            VStack(alignment: .leading, spacing: 4) {
                Text(product.brand.uppercased())
                    .font(.system(size: 11, weight: .semibold))
                    .foregroundColor(.green)
                Text(product.name)
                    .font(.system(size: 16, weight: .semibold))
                    .foregroundColor(.black)
                    .multilineTextAlignment(.leading)
                Text("Shelf $\(String(format: "%.2f", product.inStorePrice))")
                    .font(.system(size: 13))
                    .foregroundColor(.gray)
            }

            Spacer()

            Image(systemName: "chevron.right")
                .foregroundColor(.gray)
        }
        .padding(12)
        .background(Color.white)
        .cornerRadius(14)
    }

    func loadCatalog() async {
        guard let url = URL(string: "\(apiBaseURL)/products") else {
            errorMessage = "Invalid catalog URL."
            return
        }

        do {
            let (data, response) = try await URLSession.shared.data(from: url)
            guard let http = response as? HTTPURLResponse, http.statusCode == 200 else {
                errorMessage = "Could not load sample products."
                return
            }
            products = try JSONDecoder().decode([ProductResult].self, from: data)
        } catch {
            errorMessage = "Could not connect to the local API."
        }
    }
}
