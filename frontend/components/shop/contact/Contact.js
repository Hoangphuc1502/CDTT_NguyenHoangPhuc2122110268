import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Contact = () => {
  return (
    <div className="container mt-5 content">
      <h1 className="mb-4 text-center">Liên hệ với chúng tôi</h1>
      <div className="row">
        {/* Thông tin liên hệ */}
        <div className="col-md-6 mb-4">
          <h5>Thông tin liên hệ</h5>
          <p>
            <strong>Địa chỉ:</strong> 123 Đường ABC, Quận 1, TP. Hồ Chí Minh
          </p>
          <p>
            <strong>Điện thoại:</strong> (0123) 456-789
          </p>
          <p>
            <strong>Email:</strong> contact@Sport.com
          </p>
          <h5 className="mt-4">Vị trí của chúng tôi</h5>
          <div className="map-container">
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.633052740364!2d106.68943081532533!3d10.762622292327193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ee5db0d1e59%3A0xf54e6e8caa881abc!2zMTIzIMSQxrDhu51uZyBBQkMsIFF14bqjbmcgMSwgVMOibiBCw6xuaCwgVGjhu4sgU8OibiBIxrDhu51uIFBow7osIEjDsmEgTuG7mWk!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Nội dung bổ sung */}
        <div className="col-md-6">
  <h5>Dụng cụ cầu lông</h5>
<p>
  Dụng cụ cầu lông là yếu tố quan trọng giúp người chơi nâng cao hiệu suất thi đấu và bảo vệ sức khỏe trong quá trình tập luyện. Chúng tôi chuyên cung cấp các sản phẩm cầu lông chất lượng cao như vợt cầu lông, quần áo cầu lông, giày cầu lông và giày thể thao, phù hợp cho cả người mới chơi lẫn vận động viên chuyên nghiệp.
</p>
<ul>
  <li>
    <strong>Chất lượng đảm bảo:</strong> Sản phẩm được lựa chọn từ các thương hiệu uy tín, đảm bảo độ bền, sự thoải mái và an toàn khi sử dụng.
  </li>
  <li>
    <strong>Giá cả cạnh tranh:</strong> Mức giá hợp lý, phù hợp với nhiều phân khúc khách hàng, giúp bạn dễ dàng trang bị đầy đủ dụng cụ cầu lông.
  </li>
  <li>
    <strong>Tư vấn tận tâm:</strong> Đội ngũ tư vấn am hiểu cầu lông sẵn sàng hỗ trợ bạn chọn vợt, giày và trang phục phù hợp với lối chơi và thể trạng.
  </li>
</ul>
<p>
  Hãy khám phá các sản phẩm cầu lông tại cửa hàng của chúng tôi để nâng cao trải nghiệm tập luyện và thi đấu. Đừng bỏ lỡ những chương trình ưu đãi hấp dẫn giúp bạn sở hữu dụng cụ cầu lông chất lượng với giá tốt nhất.
</p>


  <a
    href="/san-pham"
    className="btn btn-primary mt-3"
  >
    Khám phá sản phẩm
  </a>
</div>

      </div>
    </div>
  );
};

export default Contact;
