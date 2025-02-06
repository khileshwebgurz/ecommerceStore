import Carousel from "react-bootstrap/Carousel";

function DarkVariantExample() {
  return (
     <Carousel data-bs-theme="dark" style={{ marginBottom: "30px", borderRadius: "10px", overflow: "hidden" }}>
      {["banner1.jpg", "banner2.jpg", "banner3.jpg"].map((img, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={`../../BannerImg/${img}`}
            alt={`Slide ${index + 1}`}
            style={{ height: "700px", objectFit: "cover", borderRadius: "10px" }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default DarkVariantExample;
