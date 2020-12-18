import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import * as d3 from "d3";

// Configuration Parameters
const gradientLabel = [0, 20, 40, 60, 80, 100];
const gradientTop = null;
const gradientBottom = null;
const colorArr = ["red", "yellow", "yellow", "green"];
const colorLevels = [0.0, 0.2, 0.3, 0.4];
const numFormat = d3.format(".2f");

const curvedLine = d3
  .line()
  .x(d => d[0])
  .y(d => d[1]);

const straightLine = d3
  .line()
  .x(d => d[0])
  .y(d => d[1]);

const createLine = length => straightLine([[0, 0], [length, 0]]);

const createArrow = (svg, x, y, rotation) => {
  svg
    .append("path")
    .attr(
      "d",
      straightLine([
        [4, 0],
        [6, 0],
        [6, 20],
        [10, 20],
        [5, 28],
        [0, 20],
        [4, 20]
      ])
    )
    .attr("fill", "#000000")
    .attr("transform", `translate(${x},${y}) rotate(${rotation})`);
};

// create boxes
const createBox = (width, height) => {
  return straightLine([[0,0], [width, 0], [width, height], [0, height]]);
 };

//create lock
const createLock = svg => {
  svg
    .append("g")
    .attr("class", "lock")
    .append("path")
    .attr(
      "d",
      straightLine([
        [240, 560],
        [300, 560],
        [300, 610],
        [1020, 610],
        [1020, 560],
        [1209, 560],
        [1209, 640],
        [240, 640]
      ])
    )
    .attr("stroke", "#B3B3B3")
    .attr("stroke-width", 2)
    .attr("fill", "#B3B3B3")
    .attr("stroke-linejoin", "bevel");
  //create water between lock and dam
  svg
    .select("g.lock")
    .append("path")
    .attr(
      "d",
      straightLine([
        [539, 370],
        [850, 370],
        [850, 560],
        [620, 560],
        [620, 410],
        [550, 410]
      ])
    )
    .attr("fill", "#82B8DC");
  //create gray background above the water
  svg
    .select("g.lock")
    .append("path")
    .attr(
      "d",
      straightLine([
        [510, 130],
        [510, 150],
        [490, 170],
        [490, 210],
        [539, 370],
        [850, 370],
        [850, 130]
      ])
    )
    .attr("fill", "#EEEEEE");
  //create gradient for water underneath the lock. See http://jsfiddle.net/ZCwrx/
  const lockGradient = svg
    .append("defs")
    .append("linearGradient")
    .attr("id", "LockGradient")
    .attr("x1", "0%")
    .attr("x2", "50%")
    .attr("y1", "0%")
    .attr("y2", "0%")
    .attr("gradientUnits", "userSpaceOnUse");
  lockGradient
    .append("stop")
    .attr("offset", "40%")
    .attr("stop-color", "#DCF1F9");
  lockGradient
    .append("stop")
    .attr("offset", "80%")
    .attr("stop-color", "#82B8DC");
  //create water underneath lock (with the above gradient)
  svg
    .select("g.lock")
    .append("path")
    .attr("d", straightLine([[300, 560], [1020, 560], [1020, 610], [300, 610]]))
    .attr("fill", "url(#LockGradient)");

  //create arrows in the water
  createArrow(svg, 310, 570, 0);
  createArrow(svg, 520, 605, -90);
  createArrow(svg, 787, 590, 180);
  createArrow(svg, 822, 590, 180);
  //rectangle below dam
  svg
    .select("g.lock")
    .append("path")
    .attr("d", straightLine([[330, 560], [330, 590], [770, 590], [770, 560]]))
    .attr("stroke", "#B3B3B3")
    .attr("stroke-width", 2)
    .attr("fill", "#B3B3B3")
    .attr("stroke-linejoin", "bevel");
  //light grey rectangle in the lock water
  svg
    .select("g.lock")
    .append("path")
    .attr(
      "d",
      straightLine([
        [670, 560],
        [670, 390],
        [545, 390],
        [560, 440],
        [610, 440],
        [610, 560]
      ])
    )
    .attr("stroke", "#B3B3B3")
    .attr("stroke-width", 2)
    .attr("fill", "#EEEEEE")
    .attr("stroke-linejoin", "bevel");
  //lock wall
  svg
    .select("g.lock")
    .append("path")
    .attr(
      "d",
      straightLine([
        [830, 560],
        [850, 560],
        [850, 130],
        [880, 130],
        [880, 560],
        [990, 560],
        [990, 590],
        [830, 590]
      ])
    )
    .attr("stroke", "#B3B3B3")
    .attr("stroke-width", 2)
    .attr("fill", "#B3B3B3");
  svg
    .select("g.lock")
    .append("path")
    .attr("d", straightLine([[795, 560], [805, 560], [805, 590], [795, 590]]))
    .attr("stroke", "#B3B3B3")
    .attr("stroke-width", 2)
    .attr("fill", "#B3B3B3");
  //create water flowing off to right side of screen
  svg
    .select("g.lock")
    .append("path")
    .attr("d", straightLine([[880, 560], [880, 510], [1210, 510], [1210, 560]]))
    .attr("fill", "#82B8DC");
};

const drawBoat = svg => {
  //draw boat
  svg
    .append("g")
    .attr("class", "boat")
    .append("path")
    .attr(
      "d",
      straightLine([
        [540, 345],
        [530, 340],
        [500, 340],
        [525, 370],
        [645, 370],
        [655, 340],
        [640, 340],
        [635, 345],
        [630, 345],
        [630, 335],
        [627, 335],
        [627, 330],
        [622, 330],
        [622, 320],
        [612, 320],
        [612, 330],
        [602, 330],
        [602, 335],
        [598, 335],
        [598, 345]
      ])
    )
    .attr("fill", "#58595D");
  //create windows on boat
  let i;
  for (i = 0; i < 4; i++) {
    let translateStr = `translate(${601 + 7 * i}, 339)`;
    svg
      .select("g.boat")
      .append("path")
      .attr("d", createBox(5, 3))
      .attr("transform", translateStr)
      .attr("fill", "#fff");
  }
  svg
    .select("g.boat")
    .append("path")
    .attr("d", createBox(6, 3))
    .attr("transform", "translate(605, 332)")
    .attr("fill", "#fff");
  //create containers on boat
  for (i = 0; i < 3; i++) {
    let translateStr = `translate(${540 + 18 * i},332)`;
    //create box for container
    svg
      .select("g.boat")
      .append("path")
      .attr("d", createBox(15, 12))
      .attr("fill", "#58595D")
      .attr("transform", translateStr);
    //split boxes (container) into ninths
    for (let j = 0; j < 2; j++) {
      const translateStr2 =
        "translate(" + (540 + 18 * i) + "," + (336 + j * 4) + ")";
      const translateStr3 = "translate(" + (545 + 18 * i + 5 * j) + ",332)";
      svg
        .select("g.boat")
        .append("path")
        .attr("d", straightLine([[0, 0], [15, 0]]))
        .attr("stroke", "#EEEEEE")
        .attr("stroke-width", 1)
        .attr("transform", translateStr2);
      svg
        .select("g.boat")
        .append("path")
        .attr("d", straightLine([[0, 0], [0, 12]]))
        .attr("stroke", "#EEEEEE")
        .attr("stroke-width", 1)
        .attr("transform", translateStr3);
    }
  }
  svg.select("g.boat").attr("transform", "translate(130, 0)");
};

const noLockTurbine = svg => {
  //bottom of lock
  svg
    .append("g")
    .attr("class", "lock")
    .append("path")
    .attr(
      "d",
      straightLine([
        [240, 560],
        [300, 560],
        [300, 610],
        [840, 560],
        [1209, 560],
        [1209, 640],
        [240, 640]
      ])
    )
    .attr("stroke", "#B3B3B3")
    .attr("stroke-width", 2)
    .attr("fill", "#B3B3B3")
    .attr("stroke-linejoin", "bevel");
  const lockGradient = svg
    .append("defs")
    .append("linearGradient")
    .attr("id", "LockGradient")
    .attr("x1", "0%")
    .attr("x2", "50%")
    .attr("y1", "0%")
    .attr("y2", "0%")
    .attr("gradientUnits", "userSpaceOnUse");
  lockGradient
    .append("stop")
    .attr("offset", "40%")
    .attr("stop-color", "#DCF1F9");
  lockGradient
    .append("stop")
    .attr("offset", "80%")
    .attr("stop-color", "#82B8DC");
  //create water underneath lock (with the above gradient)
  svg
    .select("g.lock")
    .append("path")
    .attr("d", straightLine([[300, 559], [830, 559], [830, 610], [300, 610]]))
    .attr("fill", "url(#LockGradient)");
  //create arrows in the water
  createArrow(svg, 310, 570, 0);
  createArrow(svg, 520, 605, -90);
  createArrow(svg, 787, 590, 180);
  createArrow(svg, 822, 590, 180);
  //water outside of lock
  svg
    .select("g.lock")
    .append("path")
    .attr("d", straightLine([[611, 510], [611, 560], [1210, 560], [1210, 510]]))
    .attr("fill", "#85BBDF");
  //rectangle below dam
  svg
    .select("g.lock")
    .append("path")
    .attr("d", straightLine([[330, 560], [330, 590], [770, 590], [770, 560]]))
    .attr("stroke", "#B3B3B3")
    .attr("stroke-width", 2)
    .attr("fill", "#B3B3B3")
    .attr("stroke-linejoin", "bevel");
  //separator between outlet arrows
  svg
    .select("g.lock")
    .append("path")
    .attr("d", straightLine([[795, 560], [805, 560], [805, 590], [795, 590]]))
    .attr("stroke", "#B3B3B3")
    .attr("stroke-width", 2)
    .attr("fill", "#B3B3B3");
  //grey region separating tailwater from outlet
  svg
    .select("g.lock")
    .append("path")
    .attr(
      "d",
      straightLine([
        [830, 560],
        [850, 560],
        [1020, 560],
        [1020, 590],
        [830, 590]
      ])
    )
    .attr("stroke", "#B3B3B3")
    .attr("stroke-width", 2)
    .attr("fill", "#B3B3B3");
};

const noLock = svg => {
  svg
    .append("g")
    .attr("class", "nolock")
    .append("path")
    .attr("d", straightLine([[239, 560], [611, 560], [611, 590], [239, 590]]))
    .attr("fill", "#B3B3B3");
  svg
    .select("g.nolock")
    .append("path")
    .attr("d", straightLine([[611, 510], [611, 590], [1210, 590], [1210, 510]]))
    .attr("fill", "#85BBDF");
};

const createTurbine = svg => {
      //create top part of turbine
      svg.append('g')
      .attr('class', 'turbine')
      .append('path')
      .attr('d', straightLine([[565,440],[565,430],[575,430],[575,425],[595,425],[595,430],[605,430],[605,440],[590,440],[590,540],[580,540],[580,440]]))
      .attr("stroke", "#606063")
      .attr("stroke-width", 2)
      .attr("fill", "#606063");
  //create circular part of turbine
  svg.select('g.turbine')
      .append('path')
      .attr('d', curvedLine([[580,540],[560,560],[570,570],[600,570],[610,560],[590,540]]))
      .attr("stroke", "#606063")
      .attr("stroke-width", 2)
      .attr("fill", "#606063");
  //create bottom part of turbine
  svg.select('g.turbine')
      .append('path')
      .attr('d', straightLine([[580,590],[580,575],[583,575],[583,560],[587,560],[587,575],[590,575],[590,575],[590,590]]))
      .attr("stroke", "#606063")
      .attr("stroke-width", 2)
      .attr("fill", "#606063");
  //create turbine propeller part 1
  svg.select('g.turbine')
      .append('path')
      .attr('d', curvedLine([[575,595],[580,598],[590,592],[595,595],[590,598],[580,592],[575,595]]))
      .attr("stroke", "#8D8986")
      .attr("stroke-width", 2)
      .attr("fill", "#8D8986");
  //create turbine propeller part 2
  svg.select('g.turbine')
      .append('path')
      .attr('d', straightLine([[584,590],[586,590],[586,600],[586,600],[584,600],[584,600]]))
      .attr("stroke", "#221E1F")
      .attr("stroke-width", 2)
      .attr("fill", "#221E1F");
};

const createInflowIcon = svg => {
  svg
    .append("g")
    .attr("class", "inflowIcon")
    .append("circle")
    .attr("r", 25)
    .attr("cx", 320)
    .attr("cy", 60)
    .attr("fill", "#66AAD7");
  svg
    .select("g.inflowIcon")
    .append("path")
    .attr(
      "d",
      straightLine([
        [315, 70],
        [315, 100],
        [300, 100],
        [320, 120],
        [340, 100],
        [325, 100],
        [325, 70]
      ])
    )
    .attr("fill", "#66AAD7");
  svg
    .select("g.inflowIcon")
    .append("path")
    .attr("d", straightLine([[60, 58], [320, 58], [320, 65], [60, 65]]))
    .attr("fill", "#66AAD7");
  svg
    .select("g.inflowIcon")
    .append("text")
    .attr("text-anchor", "middle")
    .attr("dx", 320)
    .attr("dy", 67)
    .attr("fill", "#fff")
    .attr("font-family", "sans-serif")
    .text("IN");
};

const createLegend = svg => {
  //create legend header
  svg
    .append("g")
    .attr("class", "legend")
    .append("text")
    .attr("dx", 1020)
    .attr("dy", 60)
    .attr("font-family", "sans-serif")
    .attr("font-size", "1.5em")
    .text("Legend");
  svg
    .select("g.legend")
    .append("path")
    .attr("d", straightLine([[1010, 70], [1220, 70]]))
    .attr("stroke", "#B3B3B3")
    .attr("fill", "#B3B3B3")
    .attr("stroke-width", 3);
  //create lake level icon
  svg
    .select("g.legend")
    .append("path")
    .attr(
      "d",
      straightLine([[1010, 90], [1010, 80], [1020, 80], [1020, 90], [1010, 90]])
    )
    .attr("fill", "#DCF1F9")
    .attr("stroke", "#B3B3B3")
    .attr("stroke-width", 1);
  svg
    .select("g.legend")
    .append("text")
    .attr("dx", 1030)
    .attr("dy", 90)
    .attr("font-family", "sans-serif")
    .text("Current Lake Level");
  //create tail water icon
  svg
    .select("g.legend")
    .append("path")
    .attr(
      "d",
      straightLine([
        [1010, 100],
        [1010, 110],
        [1020, 110],
        [1020, 100],
        [1010, 100]
      ])
    )
    .attr("fill", "#83BADF")
    .attr("stroke", "#B3B3B3")
    .attr("stroke-width", 1);
  svg
    .select("g.legend")
    .append("text")
    .attr("dx", 1030)
    .attr("dy", 110)
    .attr("font-family", "sans-serif")
    .text("Tail Water");
  //create inflow icon
  svg
    .select("g.legend")
    .append("circle")
    .attr("r", 12)
    .attr("cx", 1015)
    .attr("cy", 130)
    .attr("fill", "#66AAD7");
  svg
    .select("g.legend")
    .append("text")
    .attr("dx", 1009)
    .attr("dy", 134)
    .attr("font-family", "sans-serif")
    .attr("fill", "#fff")
    .attr("font-size", "12px")
    .text("IN");
  svg
    .select("g.legend")
    .append("text")
    .attr("dx", 1030)
    .attr("dy", 135)
    .attr("font-family", "sans-serif")
    .text("Inflow");
  //create surcharge icon
  svg
    .select("g.legend")
    .append("circle")
    .attr("r", 12)
    .attr("cx", 1015)
    .attr("cy", 160)
    .attr("fill", "#66AAD7");
  svg
    .select("g.legend")
    .append("text")
    .attr("dx", 1005)
    .attr("dy", 164)
    .attr("font-family", "sans-serif")
    .attr("fill", "#fff")
    .attr("font-size", "10px")
    .text("SUR");
  svg
    .select("g.legend")
    .append("text")
    .attr("dx", 1030)
    .attr("dy", 165)
    .attr("font-family", "sans-serif")
    .text("Surcharge Release");
  //create outflow icon
  svg
    .select("g.legend")
    .append("circle")
    .attr("r", 12)
    .attr("cx", 1015)
    .attr("cy", 190)
    .attr("fill", "#0F4868");
  svg
    .select("g.legend")
    .append("text")
    .attr("dx", 1005)
    .attr("dy", 194)
    .attr("font-family", "sans-serif")
    .attr("fill", "#fff")
    .attr("font-size", "10px")
    .text("OUT");
  svg
    .select("g.legend")
    .append("text")
    .attr("dx", 1030)
    .attr("dy", 195)
    .attr("font-family", "sans-serif")
    .text("Outflow");
};

const drawDashedLines = (svg, data, damTop, damBottom, damScale) => {
  //create dashed line
  const x = { left: 160, right: 410 },
    // angledLength unused?
    // angledLength = 270,
    length = 290,
    radius = 4;
  let priorVal = -1,
    priorMod = 0,
    priorSide = "left";

  const baseModifier = Math.abs(Math.round((damTop - damBottom) * 0.09));
  const moveByModifier = Math.max(
    10,
    Math.abs(Math.round((damTop - damBottom) * 0.09))
  );

  svg.selectAll("g.dashedLines").remove();

  // reverse order sort
  const lineData = data.sort((a, b) =>
    a.value > b.value ? -1 : a.value < b.value ? 1 : 0
  );

  //Check if the text and lines are too close, and then re-position
  lineData.forEach(function(d, i) {
    if (
      priorVal === -1 ||
      (priorVal - d.value > baseModifier || priorSide !== d.side)
    ) {
      priorVal = d.value;
      priorMod = 0;
      d.modifier = 0;
      d.lineType = "straight";
    } else if (priorVal !== d.value && priorMod === 0) {
      priorVal = d.value - moveByModifier;
      priorMod = d.modifier = moveByModifier;
      d.lineType = "angled";
    } else if (priorVal === d.value && priorMod === 0) {
      priorVal = d.value - 25;
      priorMod = d.modifier = 25;
      d.lineType = "angled";
    } else {
      priorVal = d.value - (priorMod + moveByModifier);
      priorMod = d.modifier = priorMod + moveByModifier;
      d.lineType = "angled";
    }
    priorSide = d.side;
  });

  const lines = svg
    .selectAll("g.dashedLines")
    .data(lineData, d => `${d.name}-${d.value}`)
    .enter()
    .append("g")
    .attr("class", "dashedLines");

  lines
    .append("path")
    .attr("d", d => {
      if (d.lineType === "straight") {
        return d.showLine ? createLine(length) : createLine(20);
      } else {
        return d.showLine
          ? d.side === "left"
            ? straightLine([[0, d.modifier], [20, 0], [length, 0]])
            : straightLine([[0, 0], [length - 20, 0], [length, d.modifier]])
          : straightLine([[0, d.modifier], [d.modifier, 0]]);
      }
    })
    .attr("transform", d => `translate(${x[d.side]}, ${damScale(d.value)})`)
    .attr("stroke", "#FF0000")
    .attr("fill", "none")
    .style("stroke-dasharray", ("3", "3"));

  //create red dot at the end of the dashed line
  lines
    .append("circle")
    .attr("r", radius)
    .attr("cx", d => (d.side === "left" ? x[d.side] : x[d.side] + length))
    .attr("cy", d => damScale(d.value) + d.modifier)
    .attr("fill", "#FF0000");

  lines
    .append("text")
    .attr("text-anchor", d => (d.side === "left" ? "end" : "start"))
    .attr("x", d =>
      d.side === "left" ? x[d.side] - 10 : x[d.side] + length + 10
    )
    .attr("y", d => damScale(d.value) + d.modifier + radius - 6.5)
    .attr("font-family", "sans-serif")
    .attr("fill", "#FF0000")
    .attr("font-size", "1em")
    .text(d => d.name);

  lines
    .append("text")
    .attr("text-anchor", d => (d.side === "left" ? "end" : "start"))
    .attr("x", d =>
      d.side === "left" ? x[d.side] - 10 : x[d.side] + length + 10
    )
    .attr("y", d => damScale(d.value) + d.modifier + radius + 6.5)
    .attr("font-family", "sans-serif")
    .attr("fill", "#000000")
    .attr("font-size", "1em")
    .text(d => `${d.value}'`);
};

const drawMountain = svg => {
  svg
    .append("g")
    .attr("class", "mountain")
    .append("path")
    .attr(
      "d",
      straightLine([
        [10, 100],
        [20, 60],
        [35, 45],
        [40, 35],
        [60, 25],
        [75, 65],
        [90, 70],
        [110, 100]
      ])
    )
    .attr("stroke", "#B3B3B3")
    .attr("stroke-width", 2)
    .attr("fill", "#B3B3B3");
  //draw mountain accent 1
  svg
    .select("g.mountain")
    .append("path")
    .attr(
      "d",
      straightLine([
        [20, 100],
        [25, 90],
        [22, 75],
        [30, 55],
        [27, 75],
        [40, 90],
        [40, 100]
      ])
    )
    .attr("fill", "#58595D");
  //draw mountain accent 2
  svg
    .select("g.mountain")
    .append("path")
    .attr(
      "d",
      straightLine([[60, 72], [95, 100], [85, 100], [70, 90], [65, 92]])
    )
    .attr("fill", "#58595D");
  // draw mountain accent 3
  svg
    .select("g.mountain")
    .append("path")
    .attr("d", straightLine([[60, 60], [55, 40], [63, 55], [62, 57], [70, 65]]))
    .attr("fill", "#58595D");
};

const createMiddleGradient = (svg, damScale) => {
  const topY = damScale(gradientTop);
  const bottomY = damScale(gradientBottom);
  const height = bottomY - topY;

  if (!isNaN(topY) && !isNaN(bottomY)) {
    d3.select("#MiddleGradient").remove();
    d3.select("g.middleGradient").remove();
    //add gradientScale and gradientAxis here
    //create the actual gradient with green: 60%, yellow: 60-75%, and red: 85-100%
    const middleGradient = svg
      .select("defs")
      .append("linearGradient")
      .attr("id", "MiddleGradient")
      .attr("x1", "0%")
      .attr("x2", "0%")
      .attr("y1", "0%")
      .attr("y2", "100%");

    colorLevels.forEach((d, i) => {
      middleGradient
        .append("stop")
        .attr("offset", d * 100 + "%")
        .attr("stop-color", colorArr[i]);
    });

    svg
      .append("g")
      .attr("class", "middleGradient")
      .append("path")
      .attr(
        "d",
        straightLine([
          [445, topY],
          [460, topY],
          [460, bottomY],
          [445, bottomY],
          [445, topY]
        ])
      )
      .attr("fill", "url(#MiddleGradient)");

    //create percentage marks
    if (Math.abs(topY - bottomY) > 40) {
      gradientLabel.forEach(function(d, i) {
        svg
          .select("g.middleGradient")
          .append("text")
          .attr("x", 465)
          .attr("y", topY + 5 + i * (height / 5))
          .attr("font-family", "sans-serif")
          .attr("font-size", "12px")
          .text(d + "%");
      });
    } else {
      svg
        .select("g.middleGradient")
        .append("text")
        .attr("x", 465)
        .attr("y", topY + 5)
        .attr("font-family", "sans-serif")
        .attr("font-size", "12px")
        .text(gradientLabel[0] + "%");

      svg
        .select("g.middleGradient")
        .append("text")
        .attr("x", 465)
        .attr("y", topY + 5 + (gradientLabel.length - 1) * (height / 5))
        .attr("font-family", "sans-serif")
        .attr("font-size", "12px")
        .text(gradientLabel[gradientLabel.length - 1] + "%");
    }
  }
};

const createOutflowIcon = (svg, mode) => {
  const outflowArrows = {
    dam: [
      [620, 355],
      [655, 355],
      [655, 340],
      [680, 360],
      [655, 380],
      [655, 365],
      [620, 365]
    ],
    lock: [
      [1020, 355],
      [1055, 355],
      [1055, 340],
      [1080, 360],
      [1055, 380],
      [1055, 365],
      [1020, 365]
    ],
    lockTurbine: [
      [1020, 355],
      [1055, 355],
      [1055, 340],
      [1080, 360],
      [1055, 380],
      [1055, 365],
      [1020, 365]
    ],
    turbine: [
      [620, 355],
      [655, 355],
      [655, 340],
      [680, 360],
      [655, 380],
      [655, 365],
      [620, 365]
    ]
  };

  const outflowCircles = {
    dam: { x: 600, y: 360 },
    lock: { x: 1000, y: 360 },
    lockTurbine: { x: 1000, y: 360 },
    turbine: { x: 600, y: 360 }
  };

  //create outflow icon
  svg
    .append("g")
    .attr("class", "outflowIcon")
    .append("circle")
    .attr("r", 25)
    .attr("cx", outflowCircles[mode].x)
    .attr("cy", outflowCircles[mode].y)
    .attr("fill", "#0F4868");
  svg
    .select("g.outflowIcon")
    .append("path")
    .attr("d", straightLine(outflowArrows[mode])) //outflow icon for lock
    .attr("fill", "#0F4868");
  svg
    .select("g.outflowIcon")
    .append("text")
    .attr("text-anchor", "middle")
    .attr("dx", outflowCircles[mode].x)
    .attr("dy", outflowCircles[mode].y + 5)
    .attr("fill", "#fff")
    .attr("font-family", "sans-serif")
    .text("OUT");
};

const createSurchargeIcon = svg => {
  //create inflow icon
  svg
    .append("g")
    .attr("class", "surchargeIcon")
    .append("circle")
    .attr("r", 25)
    .attr("cx", 570)
    .attr("cy", 120)
    .attr("fill", "#66AAD7");
  svg
    .select("g.surchargeIcon")
    .append("path")
    .attr(
      "d",
      straightLine([
        [565, 130],
        [565, 160],
        [550, 160],
        [570, 180],
        [590, 160],
        [575, 160],
        [575, 130]
      ])
    )
    .attr("fill", "#66AAD7");
  svg
    .select("g.surchargeIcon")
    .append("text")
    .attr("text-anchor", "middle")
    .attr("dx", 570)
    .attr("dy", 126)
    .attr("fill", "#fff")
    .attr("font-family", "sans-serif")
    .text("SUR");
};

const setText = (svg, mode, inflow, outflow, sur, tailWater, text, date) => {
  const outflowText = {
    dam: { x: 610, y: 325 },
    lock: { x: 1010, y: 325 },
    lockTurbine: { x: 1010, y: 325 },
    turbine: { x: 610, y: 325 }
  };

  d3.selectAll(".labelText").remove();

  // inflow
  svg
    .append("g")
    .attr("class", "labelText")
    .append("text")
    .attr("text-anchor", "start")
    .attr("dx", 350)
    .attr("dy", 65)
    .attr("class", "inflowText")
    .attr("font-family", "sans-serif")
    .attr("font-size", "1em")
    .text(function() {
      return !isNaN(inflow) ? inflow + " cfs" : "";
    });
  // outflow
  svg
    .append("g")
    .attr("class", "labelText")
    .append("text")
    .attr("text-anchor", "middle")
    .attr("dx", outflowText[mode].x)
    .attr("dy", outflowText[mode].y)
    .attr("class", "outflowText")
    .attr("font-family", "sans-serif")
    .attr("font-size", "1em")
    .text(function() {
      return !isNaN(outflow) ? outflow + " cfs" : "";
    });
  // surcharge
  svg
    .append("g")
    .attr("class", "labelText")
    .append("text")
    .attr("text-anchor", "start")
    .attr("dx", 605)
    .attr("dy", 124)
    .attr("class", "surchargeText")
    .attr("font-family", "sans-serif")
    .attr("font-size", "1em")
    .text(function() {
      return !isNaN(sur) ? sur + " cfs" : "";
    });
  // tailwater
  svg
    .append("g")
    .attr("class", "labelText")
    .append("text")
    .attr("text-anchor", "end")
    .attr("dx", 1200)
    .attr("dy", 530)
    .attr("fill", "#fff")
    .attr("class", "tailwaterText")
    .attr("font-family", "sans-serif")
    .attr("font-size", "18px")
    .text(function() {
      return !isNaN(tailWater) ? tailWater + "'" : "";
    });
  // current text
  svg
    .append("g")
    .attr("class", "labelText")
    .append("text")
    .attr("text-anchor", "end")
    .attr("dx", 1230)
    .attr("dy", 15)
    .attr("class", "inflowText")
    .attr("font-family", "sans-serif")
    .attr("font-size", "1em")
    .text(
      `${text} ${d3.timeFormat("%e-%b-%Y %H:%M:%S")(
        new Date(parseInt(date + "000"))
      )}`
    );
};

const drawTicks = (svg, tickScale )=> {
  svg.append("g").attr("class", "ticks");

  let length, strokeWidth;
  for (let i = 0; i < 18; i++) {
    if (i % 2 === 0) {
      strokeWidth = 4;
      length = 15;
    } else {
      strokeWidth = 2;
      length = 10;
    }

    // ticks
    svg
      .select("g.ticks")
      .append("path")
      .attr("d", createLine(length))
      .attr("stroke-width", strokeWidth)
      .attr("stroke", "#B3B3B3")
      .attr("transform", `translate(${240 - length}, ${130 + i * 25.4})`);

    // tick labels
    svg
      .select("g.ticks")
      .append("text")
      .attr("font-family", "sans-serif")
      .attr("fill", "#b3b3b3")
      .attr("font-size", "12px")
      .attr("transform", `translate(180,${135 + i * 25.4})`)
      .text(numFormat(tickScale(i)));
  }
};

const drawWaterLevel = (svg, value, damScale) => {
  svg.append("g").attr("class", "water-level");

  svg
    .select("g.water-level")
    .append("path")
    .attr(
      "d",
      straightLine([
        [247, damScale(value)],
        [247, 560],
        [409, 560],
        [409, damScale(value)]
      ])
    )
    .attr("fill", "#DCF1F9");

  svg
    .select("g.water-level")
    .append("text")
    .attr("text-anchor", "start")
    .attr("dx", 250)
    .attr("dy", damScale(value) + 20)
    .attr("fill", "#666666")
    .attr("font-family", "sans-serif")
    .attr("font-size", "24px")
    .text(`${value}'`);
};

const renderDamProfileChart = (data) => {
  const dpc = d3.select("#dpc-1");
  const {
    mode = "dam", //could be lock or dam or lockTurbine or turbine. Based off hasLock and hasLock
    hasLock = false,
    hasTurbine = false,
    damTop,
    damBottom,
    currentLevel,
    tailWater,
    inflow,
    outflow,
    sur,
    text = "Dam",
    date = ""
  } = data;
  // based off of data, will push labels into horizontalLables
  //'Top of Dam', 'Bottom of Conservation', 'Pumping Not Feasible', 'Streambed', 'Spillway Crest', 'Top of Surcharge', and 'Design Capacity'.
  const { horizontalLabels  = [
    { name: "Top of Dam", value: damTop, showLine: true, side: "left"}
  ]} = data;

  const tickScale = d3.scaleLinear().domain([0, 17]).range([damTop, damBottom]);

  const damScale = d3.scaleLinear().domain([damTop, damBottom]).range([130, 560]);

  // unused for now - belongs in createMiddleGradient func?
  // const gradientScale = d3
  //   .scaleOrdinal()
  //   .domain([0, 20, 40, 60, 80, 100])
  //   .range([damScale(gradientTop), damScale(gradientBottom)]);

  // const gradientAxis = d3.axisRight(gradientScale);

  //create line on the left
  dpc
    .append("g")
    .attr("class", "leftLine")
    .append("path")
    .attr(
      "d",
      curvedLine([
        [0, 100],
        [220, 100],
        [243, 130],
        [243, 150],
        [243, 560],
        [243, 560],
        [243, 560],
      ])
    )
    .attr("stroke", "#B3B3B3")
    .attr("stroke-width", 7)
    .attr("fill", "none")
    .attr("stroke-linejoin", "miter");
  //create center dam
  dpc
    .select("g.leftLine")
    .append("path")
    .attr(
      "d",
      straightLine([
        [410, 561],
        [410, 150],
        [390, 150],
        [390, 130],
        [510, 130],
        [510, 150],
        [490, 170],
        [490, 210],
        [560, 440],
        [610, 440],
        [610, 561],
      ])
    )
    .attr("stroke", "#B3B3B3")
    .attr("stroke-width", 2)
    .attr("fill", "#B3B3B3")
    .attr("stroke-linejoin", "bevel");

  drawWaterLevel(dpc, currentLevel, damScale);
  createLegend(dpc);
  createInflowIcon(dpc);
  drawMountain(dpc);

  if (hasLock) {
    createLock(dpc);
    drawBoat(dpc);
  } else {
    if (hasTurbine) {
      noLockTurbine(dpc);
    } else {
      noLock(dpc);
    } 
  }
  if (hasTurbine) {
    createTurbine(dpc);
  }

  drawTicks(dpc, tickScale);
  createOutflowIcon(dpc, mode);
  createSurchargeIcon(dpc, mode);
  createMiddleGradient(dpc, damScale);
  drawDashedLines(dpc, horizontalLabels, damTop, damBottom, damScale);
  setText(dpc, mode, inflow, outflow, sur, tailWater, text, date);
};

const DamProfileChart = ({ data }) => {
  // After SVG is available in the DOM
  useEffect(() => {
    renderDamProfileChart( data );
  }, [ data ]);

  return (
    <div className="col">
      <svg
        id="dpc-1"
        viewBox="0 0 1240 650"
        preserveAspectRatio="xMinYMin meet"
      ></svg>
    </div>
  );
}

DamProfileChart.propTypes = {
  data: PropTypes.object.isRequired
};

export default DamProfileChart;
