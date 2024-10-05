// src/constants/matrices.js

export const controller1Keypad = [
    [1, 1, 0],
    [2, 1, 1],
    [3, 1, 2],
    [4, 1, 3],
    [5, 1, 4],
    [6, 1, 5],
    [7, 1, 6],
    [8, 1, 7],
    [9, 1, 8],
    [10, 1, 9],
    [11, 1, 10],
    [12, 1, 11],
    [13, 1, 12],
    [14, 1, 13],
    [15, 1, 14],
    [16, 1, 15],
    [17, 1, 16],
    [18, 1, 17],
  ];
  
  export const controller2Keypad = [
    ["r1", 2, 0],
    ["r2", 2, 1],
    ["r3", 2, 2],
    ["r4", 2, 3],
    ["r5", 2, 4],
    ["r6", 2, 5],
    ["r7", 2, 6],
  ];
  
  export const controller3Display = [
    ["r1", 2, 8],
    ["r2", 2, 9],
    ["r3", 2, 10],
    ["r4", 2, 11],
    ["r5", 2, 12],
    ["r6a", 2, 13],
    ["r6b", 2, 14],
    ["r7a", 2, 15],
    ["r7b", 2, 16],
  ];
  
  export const modbusDigitalDI = [
    ['DI01', ['DI01']],
    ['DI02', ['DI02']],
    ['DI03', ['DI03']],
    ['DI04', ['DI04']],
    ['DI05', ['DI05']],
    ['DI06', ['DI06']],
    ['DI07', ['DI07']],
    ['DI08', ['DI08']],
    ['DI09', ['DI09']],
    ['DI10', ['DI10']],
    ['DI11', ['DI11']],
    ['DI12', ['DI12']],
    ['DI13', ['DI13']],
    ['DI14', ['DI14']],
    ['DI15', ['DI15']],
    ['DI16', ['DI16']],
    ['DI17', ['DI17']],
    ['DI18', ['DI18']],
  ];
  
  export const modbusDigitalDO = [
    { text: 'DO01', registerPath: ['DO01'], register: 'CO_16432' },
    { text: 'DO02', registerPath: ['DO02'], register: 'CO_16433' },
    { text: 'DO03', registerPath: ['DO03'], register: 'CO_16434' },
    { text: 'DO04', registerPath: ['DO04'], register: 'CO_16435' },
    { text: 'DO05', registerPath: ['DO05'], register: 'CO_16436' },
    { text: 'DO06', registerPath: ['DO06'], register: 'CO_16437' },
    { text: 'DO07', registerPath: ['DO07'], register: 'CO_16438' },
  ];
  
  export const matrixSecCurrButtons = [
    ["0 uA", "a,w010"],
    ["100 uA", "a,w011"],
    ["200 uA", "a,w012"],
    ["300 uA", "a,w013"],
    ["400 uA", "a,w014"],

  ];

  export const matrixSecVoltButtons = [
    ["0 mV", "a,w020"],
    ["200 mV", "a,w021"],
    ["400 mV", "a,w022"],
    ["600 mV", "a,w023"],
    ["800 mV", "a,w024"],
    ["1000 mV", "a,w025"],
  ];

  export const matrixPrimCurrRMSButtons = [
    ["0 mA", "a,w040"],
    ["200 mA", "a,w041"],
    ["400 mA", "a,w042"],
    ["600 mA", "a,w043"],
    ["800 mA", "a,w044"],
    ["1000 mA", "a,w045"],
  ];

  export const matrixPrimVoltRMSButtons = [
    ["0 V", "a,w030"],
    ["1 V", "a,w031"],
    ["2 V", "a,w032"],
    ["3 V", "a,w033"],
    ["4 V", "a,w034"],
    ["5 V", "a,w035"],
  ];

  export const matrixSAut1Buttons = [
    ["0 mA", "a,w050"],
    ["4 mA", "a,w051"],
    ["8 mA", "a,w052"],
    ["12 mA", "a,w053"],
    ["16 mA", "a,w054"],
    ["20 mA", "a,w055"],
  ];
  