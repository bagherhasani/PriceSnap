import SwiftUI
import AVFoundation

// This is the actual camera view
// UIViewControllerRepresentable = lets us use
// Apple's camera controller inside SwiftUI
struct BarcodeScannerView: UIViewControllerRepresentable {
    
    // This closure gets called when a barcode is found
    // Think of it like a callback in Python
    var onBarcodeFound: (String) -> Void
    
    func makeUIViewController(context: Context) -> ScannerViewController {
        let controller = ScannerViewController()
        controller.onBarcodeFound = onBarcodeFound
        return controller
    }
    
    func updateUIViewController(_ uiViewController: ScannerViewController, context: Context) {}
}

// The actual camera logic lives here
class ScannerViewController: UIViewController, AVCaptureMetadataOutputObjectsDelegate {
    
    var onBarcodeFound: ((String) -> Void)?
    var captureSession: AVCaptureSession!
    var previewLayer: AVCaptureVideoPreviewLayer!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupCamera()
    }
    
    func setupCamera() {
        // 1. Start a camera session
        captureSession = AVCaptureSession()
        
        // 2. Get the back camera
        guard let camera = AVCaptureDevice.default(for: .video),
              let input = try? AVCaptureDeviceInput(device: camera) else {
            return
        }
        
        // 3. Add camera input to session
        captureSession.addInput(input)
        
        // 4. Set up barcode detector
        let metadataOutput = AVCaptureMetadataOutput()
        captureSession.addOutput(metadataOutput)
        
        // 5. Tell it to call us when barcode found
        metadataOutput.setMetadataObjectsDelegate(self, queue: DispatchQueue.main)
        
        // 6. Tell it what barcode types to look for
        // EAN13 = most products worldwide
        // QR = QR codes
        // UPC = US products
        metadataOutput.metadataObjectTypes = [.ean13, .ean8, .upce, .qr, .code128]
        
        // 7. Show camera feed on screen
        previewLayer = AVCaptureVideoPreviewLayer(session: captureSession)
        previewLayer.frame = view.layer.bounds
        previewLayer.videoGravity = .resizeAspectFill
        view.layer.addSublayer(previewLayer)
        
        // 8. Start the camera (runs on background thread)
        DispatchQueue.global(qos: .background).async {
            self.captureSession.startRunning()
        }
    }
    
    // 9. This gets called automatically when barcode detected
    func metadataOutput(_ output: AVCaptureMetadataOutput,
                        didOutput metadataObjects: [AVMetadataObject],
                        from connection: AVCaptureConnection) {
        
        guard let metadata = metadataObjects.first as? AVMetadataMachineReadableCodeObject,
              let barcode = metadata.stringValue else { return }
        
        // Stop scanning after first barcode found
        captureSession.stopRunning()
        
        // Send barcode number back to SwiftUI
        // e.g. "0194252914687"
        onBarcodeFound?(barcode)
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        if captureSession.isRunning {
            captureSession.stopRunning()
        }
    }
}
