import React, { useEffect, useRef, useState } from 'react';
import './Awards.css';
import { productImg } from './awardsData';
import circleImage from '../../assets/Ellipse.db41705c5a6b27e13803.png';

const titleDescription = [
  {
    title: 'Brand of the year',
    desc: 'The Brand of the Year is a distinctive and premier recognition for a brand recognized as a champion in its industry category based on current year market standing and consumer preference.',
  },
  {
    title: 'Product of the year',
    desc: 'The Product of the Year Award celebrates the best products in the market in different categories of FMCG products and rewards manufacturers for quality, strategy, marketing and other parameters.',
  },
  {
    title: 'Product launch of the year',
    desc: 'The Product Launch of the Year Award celebrates the efforts of FMCG companies who continuously develop new products, brand extensions and packaging updates to meet the new industry standards and demands of the consumers.',
  },
];

const Awards = () => {
  const [content, setContent] = useState(0);
  const mainContentRef = useRef();
  const productImagesRef = useRef();
  const circleImageRef = useRef();
  const contentRef = useRef(content);
  const countRotationRef = useRef([]);

  function trigerAnimation() {
    mainContentRef.current.children[0].classList.add('hide');
    mainContentRef.current.children[1].classList.add('hide');
    circleImageRef.current.style.transform = `translate(-50%) rotate(${
      contentRef.current === 0 ? 15 : contentRef.current === 1 ? 30 : 0
    }deg)`;
    Array.from(productImagesRef.current.children).forEach((prod) => {
      prod.style.transform = `translate(-50%, -50%) rotate(calc(var(--tiltAngle) + ${
        (2 * contentRef.current + 1) * 60 + countRotationRef.current * 360
      }deg))
       translateY(calc(-1 * (var(--circleSize) / 2.2) + 8vw))`;
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
    const timer = setInterval(() => {
      trigerAnimation();
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="awards">
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
      </div>
    </section>
  );
};

export default Awards;
