import SwiftUI

struct ContentView: View {
    
    // state flags to change satate of the app.
    @State private var isScanning = false // state variable to track if the scanner is active
    @State private var scannedBarcode = "" // state variable to track the scanned barcode
    @State private var showResult = false // state variable to track if the result view should be shown
    @State private var showWatchlist = false // state variable to track if the watchlist view should be shown
    @State private var showCatalog = false // state variable to track if the catalog view should be shown
    
    var body: some View {
        NavigationStack {
            ZStack {
                Color(white: 0.96).ignoresSafeArea()
                
                if isScanning {
                    ZStack {
                        BarcodeScannerView { barcode in
                            self.scannedBarcode = barcode
                            self.isScanning = false
                            self.showResult = true
                        }
                        .ignoresSafeArea()
                        
                        VStack {
                            HStack {
                                Spacer()
                                Button("Cancel") {
                                    isScanning = false
                                }
                                .foregroundColor(.white)
                                .padding()
                                .background(Color.black.opacity(0.5))
                                .cornerRadius(10)
                                .padding()
                            }
                            
                            Spacer()
                            
                            RoundedRectangle(cornerRadius: 12)
                                .stroke(Color.green, lineWidth: 3)
                                .frame(width: 250, height: 150)
                            
                            Spacer()
                            
                            Text("Point at any barcode")
                                .foregroundColor(.white)
                                .font(.system(size: 16))
                                .padding(.bottom, 50)
                        }
                    }
                    
                } else {
                    VStack(spacing: 40) {
                        
                        VStack(spacing: 12) {
                            Image(systemName: "barcode.viewfinder")
                                .font(.system(size: 80))
                                .foregroundColor(.green)
                            
                            Text("PriceSnap")
                                .font(.system(size: 36, weight: .bold))
                                .foregroundColor(.black)
                            
                            Text("Scan any product. Find the best price.")
                                .font(.system(size: 16))
                                .foregroundColor(.gray)
                                .multilineTextAlignment(.center)
                        }
                        
                        if !scannedBarcode.isEmpty {
                            Text("Last scan: \(scannedBarcode)")
                                .foregroundColor(.green)
                                .font(.system(size: 14))
                                .padding(.horizontal, 20)
                                .padding(.vertical, 10)
                                .background(Color.green.opacity(0.1))
                                .cornerRadius(8)
                        }
                        
                        Spacer()
                        
                        Button(action: {
                            isScanning = true
                        }) {
                            HStack(spacing: 12) {
                                Image(systemName: "camera.viewfinder")
                                    .font(.system(size: 22))
                                Text("Scan Barcode")
                                    .font(.system(size: 20, weight: .semibold))
                            }
                            .foregroundColor(.white)
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 18)
                            .background(Color.green)
                            .cornerRadius(16)
                            .padding(.horizontal, 32)
                        }
                        
                        Spacer()

                        Button("Sample products") {
                            showCatalog = true
                        }
                        .foregroundColor(.green)
                        .font(.system(size: 16, weight: .semibold))

                        Button("Watchlist") {
                            showWatchlist = true
                        }
                        .foregroundColor(.green)
                        .font(.system(size: 16, weight: .semibold))

                        Text("Tap scan to get started")
                            .font(.system(size: 14))
                            .foregroundColor(.gray.opacity(0.6))
                            .padding(.bottom, 20)
                    }
                    .padding(.top, 80)
                }
            }

            // go to show-result view
            .navigationDestination(isPresented: $showResult) {
                ResultView(barcode: scannedBarcode)
            }
            .navigationDestination(isPresented: $showWatchlist) {
                WatchlistView()
            }
            .navigationDestination(isPresented: $showCatalog) {
                CatalogView()
            }
        }
    }
}

#Preview {
    ContentView()
}
