import React from "react";
import { Card, Badge } from "antd";
import Link from "next/link";

const { Meta } = Card;

const CourseCard = ({ course }) => {
  const { name, instructor, price, image, slug, paid, category, description } =
    course;
  return (
    <Link href={`/course/${slug}`}>
      <a>
        <Card
          className="mb-4 shadow-md shw rounded-md"
          cover={
            <img
              src={image.Location}
              alt-name
              style={{ height: "220px" }}
              className="p-2"
            />
          }
        >
          <h2 className="font-bold">{name}</h2>
          <p>{description.slice(0, 100)}...</p>
          <div className="flex h-max  justify-between font-bold">
            <Badge
              count={category}
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                height: 35,
                padding: 8,
                marginTop: 10,
              }}
            />
            <div className=" flex items-center h-max m-auto text-xl">
              <span className="items-center ">
                {price === 0 ? "FREE" : price}
              </span>
            </div>
          </div>
        </Card>
      </a>
    </Link>
  );
};

export default CourseCard;
