import { useState } from "react";

const images = [
  "https://via.placeholder.com/600x200?text=Slide+1",
  "https://via.placeholder.com/600x200?text=Slide+2",
  "https://via.placeholder.com/600x200?text=Slide+3"
];

function Slider() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((index + 1) % images.length);
  const prev = () => setIndex((index - 1 + images.length) % images.length);

  return (
    <div>
      <img src={images[index]} alt="slide" width="100%" />
      <button onClick={prev}>Prev</button>
      <button onClick={next}>Next</button>
    </div>
  );
}

export default Slider;