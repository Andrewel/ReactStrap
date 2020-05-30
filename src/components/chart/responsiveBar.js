import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const data = [
  {
    country: 'AD',
    'hot dog': 22,
    'hot dogColor': 'hsl(67, 70%, 50%)',
    burger: 178,
    burgerColor: 'hsl(32, 70%, 50%)',
    sandwich: 66,
    sandwichColor: 'hsl(177, 70%, 50%)',
    kebab: 55,
    kebabColor: 'hsl(321, 70%, 50%)',
    fries: 1,
    friesColor: 'hsl(20, 70%, 50%)',
    donut: 94,
    donutColor: 'hsl(216, 70%, 50%)',
  },
  {
    country: 'AE',
    'hot dog': 32,
    'hot dogColor': 'hsl(136, 70%, 50%)',
    burger: 9,
    burgerColor: 'hsl(356, 70%, 50%)',
    sandwich: 196,
    sandwichColor: 'hsl(303, 70%, 50%)',
    kebab: 112,
    kebabColor: 'hsl(17, 70%, 50%)',
    fries: 44,
    friesColor: 'hsl(146, 70%, 50%)',
    donut: 140,
    donutColor: 'hsl(312, 70%, 50%)',
  },
  {
    country: 'AF',
    'hot dog': 103,
    'hot dogColor': 'hsl(56, 70%, 50%)',
    burger: 20,
    burgerColor: 'hsl(284, 70%, 50%)',
    sandwich: 200,
    sandwichColor: 'hsl(263, 70%, 50%)',
    kebab: 17,
    kebabColor: 'hsl(130, 70%, 50%)',
    fries: 11,
    friesColor: 'hsl(49, 70%, 50%)',
    donut: 56,
    donutColor: 'hsl(95, 70%, 50%)',
  },
  {
    country: 'AG',
    'hot dog': 140,
    'hot dogColor': 'hsl(119, 70%, 50%)',
    burger: 5,
    burgerColor: 'hsl(21, 70%, 50%)',
    sandwich: 61,
    sandwichColor: 'hsl(33, 70%, 50%)',
    kebab: 123,
    kebabColor: 'hsl(38, 70%, 50%)',
    fries: 58,
    friesColor: 'hsl(197, 70%, 50%)',
    donut: 100,
    donutColor: 'hsl(48, 70%, 50%)',
  },
  {
    country: 'AI',
    'hot dog': 150,
    'hot dogColor': 'hsl(267, 70%, 50%)',
    burger: 151,
    burgerColor: 'hsl(30, 70%, 50%)',
    sandwich: 140,
    sandwichColor: 'hsl(70, 70%, 50%)',
    kebab: 163,
    kebabColor: 'hsl(336, 70%, 50%)',
    fries: 15,
    friesColor: 'hsl(114, 70%, 50%)',
    donut: 89,
    donutColor: 'hsl(200, 70%, 50%)',
  },
  {
    country: 'AL',
    'hot dog': 57,
    'hot dogColor': 'hsl(80, 70%, 50%)',
    burger: 36,
    burgerColor: 'hsl(50, 70%, 50%)',
    sandwich: 27,
    sandwichColor: 'hsl(286, 70%, 50%)',
    kebab: 135,
    kebabColor: 'hsl(155, 70%, 50%)',
    fries: 200,
    friesColor: 'hsl(75, 70%, 50%)',
    donut: 159,
    donutColor: 'hsl(93, 70%, 50%)',
  },
  {
    country: 'AM',
    'hot dog': 173,
    'hot dogColor': 'hsl(331, 70%, 50%)',
    burger: 197,
    burgerColor: 'hsl(310, 70%, 50%)',
    sandwich: 82,
    sandwichColor: 'hsl(297, 70%, 50%)',
    kebab: 95,
    kebabColor: 'hsl(254, 70%, 50%)',
    fries: 118,
    friesColor: 'hsl(198, 70%, 50%)',
    donut: 15,
    donutColor: 'hsl(172, 70%, 50%)',
  },
];

export const MyResponsiveBar = (
  {
    /* data */
    /* see data tab */
  }
) => (
  <ResponsiveBar
    data={data}
    keys={['hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut']}
    indexBy='country'
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.35}
    layout='horizontal'
    colors={{ scheme: 'nivo' }}
    defs={[
      {
        id: 'dots',
        type: 'patternDots',
        background: 'inherit',
        color: '#38bcb2',
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: 'lines',
        type: 'patternLines',
        background: 'inherit',
        color: '#eed312',
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    fill={[
      {
        match: {
          id: 'fries',
        },
        id: 'dots',
      },
      {
        match: {
          id: 'sandwich',
        },
        id: 'lines',
      },
    ]}
    borderColor={{ from: 'color', modifiers: [['darker', '1.6']] }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'country',
      legendPosition: 'middle',
      legendOffset: 32,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'food',
      legendPosition: 'middle',
      legendOffset: -40,
    }}
    enableGridX={true}
    enableGridY={false}
    labelSkipWidth={11}
    labelSkipHeight={12}
    labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
    legends={[
      {
        dataFrom: 'keys',
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 120,
        translateY: 0,
        itemsSpacing: 2,
        itemWidth: 106,
        itemHeight: 20,
        itemDirection: 'left-to-right',
        itemOpacity: 0.85,
        symbolSize: 20,
        effects: [
          {
            on: 'hover',
            style: {
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
    animate={true}
    motionStiffness={90}
    motionDamping={15}
  />
);
