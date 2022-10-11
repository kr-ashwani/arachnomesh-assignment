import React, { useEffect, useRef, useState } from 'react';
import './Awards.css';
import { productImg, productTagImg, titleDescription } from './awardsData';
import circleImage from '../../assets/Ellipse.db41705c5a6b27e13803.png';

const Awards = () => {
  const [content, setContent] = useState(0);
  const mainContentRef = useRef();
  const awardsRef = useRef();
  const productImagesRef = useRef();
  const circleImageRef = useRef();
  const productTagRef = useRef();
  const contentRef = useRef(content);
  const countRotationRef = useRef(0);
  const blockAnimationRef = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      () => {
        trigerAnimation();
      },
      { threshold: 0.12 }
    );
    observer.observe(awardsRef.current);

    const awards = awardsRef.current;
    return () => observer.unobserve(awards);
  }, []);

  function trigerAnimation() {
    if (blockAnimationRef.current) return;
    blockAnimationRef.current = 1;
    setTimeout(() => (blockAnimationRef.current = 0), 1210);

    mainContentRef.current.children[0].classList.add('hide');
    mainContentRef.current.children[1].classList.add('hide');
    const index = contentRef.current + 1 === 3 ? 0 : contentRef.current + 1;
    Array.from(productTagRef.current.children).forEach((elem) =>
      elem.classList.remove('show')
    );
    productTagRef.current.children[index].classList.add('show');
    circleImageRef.current.style.transform = `translate(-50%) rotate(${
      contentRef.current === 0 ? 15 : contentRef.current === 1 ? 30 : 0
    }deg)`;
    Array.from(productImagesRef.current.children).forEach((prod) => {
      prod.style.transform = `translate(-50%, -50%) rotate(calc(var(--tiltAngle) + ${
        (2 * contentRef.current + 1) * 60 + countRotationRef.current * 360
      }deg))
       translateY(calc(-1 * (var(--circleSize) / 2.2) + 18vh))`;
    });
    setTimeout(() => {
      setContent((prev) => {
        mainContentRef.current.children[0].classList.remove('hide');
        mainContentRef.current.children[1].classList.remove('hide');
        Array.from(productImagesRef.current.children).forEach((prod) => {
          prod.style.transform = `translate(-50%, -50%) rotate(calc(var(--tiltAngle) + ${
            (contentRef.current + 1) * 120 + countRotationRef.current * 360
          }deg))
           translateY(calc(-1 * (var(--circleSize) / 2.2)))`;
        });

        if (contentRef.current === 2) countRotationRef.current += 1;
        if (prev === titleDescription.length - 1) return 0;
        return prev + 1;
      });
    }, 600);
  }

  useEffect(() => {
    contentRef.current = content;
  }, [content]);

  useEffect(() => {
    const timer = setInterval(() => trigerAnimation(), 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={awardsRef} id="awards">
      <div className="awardsContent">
        <div className="awardsTitle" onClick={trigerAnimation}>
          <h2>AWARDS CATEGORIES</h2>
        </div>
      </div>
      <div ref={mainContentRef} className="awardsContentMain">
        <h3>{titleDescription[content].title}</h3>
        <p>{titleDescription[content].desc}</p>
      </div>

      <div className="awardsClippedCircle">
        <div className="awardCircle">
          <img ref={circleImageRef} src={circleImage} alt="circle" />
        </div>
        <div ref={productImagesRef} className="productImages">
          {productImg.map((product, id) => {
            return (
              <img
                key={id}
                src={product.imageUrl}
                alt={`product${id}`}
                style={{ '--tiltAngle': `${id * 24}deg` }}
              />
            );
          })}
        </div>
        <div ref={productTagRef} className="productImagesTag">
          <img
            src={productTagImg[0].imageUrl}
            className="show"
            alt="productTag0"
          />
          <img src={productTagImg[1].imageUrl} alt="productTag1" />
          <img src={productTagImg[2].imageUrl} alt="productTag2" />
        </div>
      </div>
    </section>
  );
};

export default Awards;
