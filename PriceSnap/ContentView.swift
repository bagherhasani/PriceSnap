import SwiftUI

struct ContentView: View {
    
    @State private var isScanning = false
    @State private var scannedBarcode = ""
    @State private var showResult = false
    
    var body: some View {
        NavigationStack {
            ZStack {
                Color.black.ignoresSafeArea()
                
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
                                .foregroundColor(.white)
                            
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
                            .foregroundColor(.black)
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 18)
                            .background(Color.green)
                            .cornerRadius(16)
                            .padding(.horizontal, 32)
                        }
                        
                        Spacer()
                        
                        Text("Tap scan to get started")
                            .font(.system(size: 14))
                            .foregroundColor(.gray.opacity(0.6))
                            .padding(.bottom, 20)
                    }
                    .padding(.top, 80)
                }
            }
            .navigationDestination(isPresented: $showResult) {
                ResultView(barcode: scannedBarcode)
            }
        }
    }
}

#Preview {
    ContentView()
}
