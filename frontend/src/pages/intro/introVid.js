import React, { useState, useEffect } from "react";
import { useRoute } from "react-router5";
import styled from "styled-components";
const DarkBG = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #000;
`;
export default (props) => {
  const { router } = useRoute();
  const [currentVid, setCurrentVid] = useState(0);
  const Vids = [
    {
      vid: (
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/BZtx1VTdqU8?autoplay=1"
          frameborder="0"
          title="1"></iframe>
      ),
      time: 46000,
    },
    {
      vid: (
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/hTPkaChql4k"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          title="2"></iframe>
      ),
      time: 39000,
    },
    {
      vid: (
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/7NLL94YDR8c"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          title="3"></iframe>
      ),
      time: 60200,
    },
    {
      vid: (
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/ygYGigck_Hw"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          title="4"></iframe>
      ),
      time: 74000,
    },
    {
      vid: (
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/3rw7URwC8kU"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          title="5"></iframe>
      ),
      time: 55000,
    },
    {
      vid: (
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/_EF1Ycydkp8"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          title="6"></iframe>
      ),
      time: 60800,
    },
    {
      vid: (
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/TaLCNdOZ9j0"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          title="7"></iframe>
      ),
      time: 60800,
    },
    {
      vid: (
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/y08CIDgCx84"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          title="8"></iframe>
      ),
      time: 56000,
    },
    {
      vid: (
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/E1AaltDxrjM"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          title="9"></iframe>
      ),
      time: 54000,
    },
    {
      vid: (
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/1zK9ZrtIiyk"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          title="10"></iframe>
      ),
      time: 55000,
    },
    {
      vid: (
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/jw_RWbLlPu4"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          title="11"></iframe>
      ),
      time: 49000,
    },
  ];
  useEffect(() => {
    if (currentVid <= 10) {
      setTimeout(() => {
        setCurrentVid(currentVid + 1);
      }, Vids[currentVid].time);
    }
  }, [currentVid, Vids]);
  return <DarkBG>{Vids[currentVid].vid}</DarkBG>;
};
