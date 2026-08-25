import SwiftUI

struct WatchlistView: View {
    var body: some View {
        ZStack {
            Color(white: 0.96).ignoresSafeArea()
            ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                Text("WATCHLIST")
                    .font(.system(size: 11, weight: .semibold))
                    .foregroundColor(.gray)
                    .tracking(2)

                watchRow(
                    image: "dasani",
                    name: "Dasani 20 oz",
                    target: 1.50,
                    current: 1.28,
                    note: "Alert if it drops under $1.50"
                )
                watchRow(
                    image: "airmax",
                    name: "Nike Air Max 270",
                    target: 85.00,
                    current: 79.00,
                    note: "Already under your $85 cap"
                )
                watchRow(
                    image: "headphones",
                    name: "Sony WH-1000XM5",
                    target: 300.00,
                    current: 328.00,
                    note: "Waiting to drop under $300"
                )

                Text("Demo list. Alerts are not sending yet.")
                    .font(.system(size: 13))
                    .foregroundColor(.gray)
                    .padding(.top, 8)

                Spacer()
            }
            .padding(20)
            }
        }
        .navigationTitle("Alerts")
        .navigationBarTitleDisplayMode(.inline)
    }

    func watchRow(image: String, name: String, target: Double, current: Double, note: String) -> some View {
        HStack(alignment: .top, spacing: 12) {
            Image(image)
                .resizable()
                .scaledToFill()
                .frame(width: 64, height: 64)
                .clipped()
                .background(Color.white)
                .cornerRadius(10)

            VStack(alignment: .leading, spacing: 8) {
                Text(name)
                    .font(.system(size: 17, weight: .semibold))
                    .foregroundColor(.black)
                HStack {
                    Text("Now $\(String(format: "%.2f", current))")
                        .foregroundColor(.green)
                    Spacer()
                    Text("Cap $\(String(format: "%.2f", target))")
                        .foregroundColor(.gray)
                }
                .font(.system(size: 14))
                Text(note)
                    .font(.system(size: 13))
                    .foregroundColor(.gray)
            }
        }
        .padding(16)
        .background(Color.white)
        .cornerRadius(14)
    }
}
