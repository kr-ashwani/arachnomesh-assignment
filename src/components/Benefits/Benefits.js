import React, { useEffect, useRef, useState } from 'react';
import './Benefits.css';
import { benefitsData, tagColors } from './benefitsData';

const Benefits = () => {
  const [animate, setAnimate] = useState(0);
  const benefitsRef = useRef();
  const fallCardRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (event) => {
        setAnimate(event[0].isIntersecting);
      },
      { threshold: 0.12 }
    );
    observer.observe(benefitsRef.current);

    const benefit = benefitsRef.current;
    return () => observer.unobserve(benefit);
  }, []);

  const getRndNumber = (min, max) =>
    Math.floor(min + Math.random() * (max - min + 1));

  function getTagProperties() {
    return {
      '--tagWidth': `${getRndNumber(21, 25)}vh`,
      '--tagColor': tagColors[Math.floor(Math.random() * tagColors.length)],
    };
  }
  function getSwingProperties() {
    return {
      '--Zswing': `${getRndNumber(8, 12)}deg`,
      '--Yswing': `${getRndNumber(15, 25)}deg`,
      '--swingDelay': `${getRndNumber(0, 1000)}ms`,
    };
  }

  function getFallTagProperties(row) {
    return {
      ...getTagProperties(),
      '--fallDelay': `${getRndNumber(0, 1000)}ms`,
      '--fallAngle': `${getRndNumber(-25, 25)}deg`,
      '--translateTop': `${row === 'row1' ? -350 : -400}px`,
    };
  }

  return (
    <div ref={benefitsRef} id="benefits">
      <div className="benefitsTitle">
        <h2>BENEFITS</h2>
      </div>
      <div className="benefitsMain">
        <div ref={fallCardRef} className="benefitsFallCard">
          <div className="fallCardRow1">
            <div
              style={getFallTagProperties('row1')}
              className={`fallTag ${animate ? 'animate' : ''}`}>
              PR
            </div>
            <div
              style={getFallTagProperties('row1')}
              className={`fallTag ${animate ? 'animate' : ''}`}>
              Increase sales
            </div>
          </div>
          <div className="fallCardRow2">
            <div
              style={getFallTagProperties('row2')}
              className={`fallTag ${animate ? 'animate' : ''}`}>
              Exposure
            </div>
            <div
              style={getFallTagProperties('row2')}
              className={`fallTag ${animate ? 'animate' : ''}`}>
              Positivity
            </div>
            <div
              style={getFallTagProperties('row2')}
              className={`fallTag ${animate ? 'animate' : ''}`}>
              Recognition
            </div>
            <div
              style={getFallTagProperties('row2')}
              className={`fallTag ${animate ? 'animate' : ''}`}>
              Networking
            </div>
            <div
              style={getFallTagProperties('row2')}
              className={`fallTag ${animate ? 'animate' : ''}`}>
              Differentiation
            </div>
            <div
              style={getFallTagProperties('row2')}
              className={`fallTag ${animate ? 'animate' : ''}`}>
              Showcasing
            </div>
            <div
              style={getFallTagProperties('row2')}
              className={`fallTag ${animate ? 'animate' : ''}`}>
              Excellence
            </div>
          </div>
        </div>
        <div className="benefitsCardConatiner">
          {benefitsData.map((data, id) => (
            <div key={id} className="benefitsCard">
              <div className="cardTag" style={getTagProperties()}>
                {data.tag}
              </div>
              <img
                src={data.imageUrl}
                style={getSwingProperties()}
                alt={`card${id}`}
              />
              <h4 className="cardCategory">{data.category}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Benefits;
