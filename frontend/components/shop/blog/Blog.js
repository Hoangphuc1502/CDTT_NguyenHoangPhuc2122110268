import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Blog = () => {
  const blogPosts = [
    {
      title: "Review Vợt Cầu Lông Lining Halbertec 9000 Power: Liệu có thực sự “toàn năng” như lời đồn?",
      content: "Liệu Vợt Cầu Lông Lining Halbertec 9000 Power có thực sự là “vũ khí tối thượng” giúp bạn làm chủ mọi đường cầu.",
      author: "Nguyễn Văn A",
      date: "01/10/2025",
      image: "/img/list/aaa.png",
      href: "https://caulong360.com/blog/review-lining-halbertec-9000-power/" // Thêm liên kết vào đây
    },
    
    
  ];

  return (
    <div className="container mt-5 content">
  <h1 className="mb-4 text-center">Blog</h1>
  <div className="row">
    {blogPosts.map((post, index) => (
      <div key={index} className="col-md-6 mb-4">
        <a href={post.href} className="text-decoration-none">
          <div className="card h-100 shadow-sm">
            <img src={post.image} className="card-img-top" alt={post.title} />
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {post.author} - {post.date}
              </h6>
              <p className="card-text">{post.content}</p>
            </div>
          </div>
        </a>
      </div>
    ))}
  </div>
</div>

  );
};

export default Blog;
