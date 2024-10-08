export const modbusRegisterMatrix = {
  Limiter: {
    registerPath: ['Limiter'],
    register: 'IN_16',
    convertToDisplay: (value) => value,
    convertToValue: (value) => Math.round(parseFloat(value)),
    placeholderKey: 'limiter_placeholder',
    labelKey: 'limiter_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  ActCurrLim: {
    registerPath: ['ActCurrLim'],
    register: 'IN_17',
    convertToDisplay: (value) => value,
    convertToValue: (value) => Math.round(parseFloat(value)),
    placeholderKey: 'act_curr_lim_placeholder',
    labelKey: 'act_curr_lim_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  Semipulse: {
    registerPath: ['Semipulse'],
    register: 'IN_18',
    convertToDisplay: (value) => value,
    convertToValue: (value) => Math.round(parseFloat(value)),
    placeholderKey: 'semipulse_placeholder',
    labelKey: 'semipulse_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  FiringRatio: {
    registerPath: ['FiringRatio'],
    register: 'IN_19',
    convertToDisplay: (value) => (value),
    convertToValue: (value) => Math.round(parseFloat(value) * 100),
    placeholderKey: 'firing_ratio_placeholder',
    labelKey: 'firing_ratio_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  ActFiringAngle: {
    registerPath: ['ActFiringAngle'],
    register: 'IN_20',
    convertToDisplay: (value) => (value / 10).toFixed(1),
    convertToValue: (value) => Math.round(parseFloat(value) * 10),
    placeholderKey: 'act_firing_angle_placeholder',
    labelKey: 'act_firing_angle_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  FRLimiter: {
    registerPath: ['FRLimiter'],
    register: 'IN_21',
    convertToDisplay: (value) => value,
    convertToValue: (value) => Math.round(parseFloat(value)),
    placeholderKey: 'fr_limiter_placeholder',
    labelKey: 'fr_limiter_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  SecCurrPulseA: {
    registerPath: ['SecCurrPulseA'],
    register: 'IN_22',
    convertToDisplay: (value) => value,
    convertToValue: (value) => Math.round(parseFloat(value)),
    placeholderKey: 'sec_curr_pulse_a_placeholder',
    labelKey: 'sec_curr_pulse_a_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  SecCurrPulseB: {
    registerPath: ['SecCurrPulseB'],
    register: 'IN_23',
    convertToDisplay: (value) => value,
    convertToValue: (value) => Math.round(parseFloat(value)),
    placeholderKey: 'sec_curr_pulse_b_placeholder',
    labelKey: 'sec_curr_pulse_b_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  LineVoltRms: {
    registerPath: ['LineVoltRms'],
    register: 'IN_24',
    convertToDisplay: (value) => value,
    convertToValue: (value) => Math.round(parseFloat(value)),
    placeholderKey: 'line_volt_rms_placeholder',
    labelKey: 'line_volt_rms_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  PriCurrRms: {
    registerPath: ['PriCurrRms'],
    register: 'IN_25',
    convertToDisplay: (value) => (value / 10).toFixed(1),
    convertToValue: (value) => Math.round(parseFloat(value) * 10),
    placeholderKey: 'pri_curr_rms_placeholder',
    labelKey: 'pri_curr_rms_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  ActPower: {
    registerPath: ['ActPower'],
    register: 'IN_26',
    convertToDisplay: (value) => (value / 10).toFixed(1),
    convertToValue: (value) => Math.round(parseFloat(value) * 10),
    placeholderKey: 'act_power_placeholder',
    labelKey: 'act_power_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  SecVoltAvg: {
    registerPath: ['SecVoltAvg'],
    register: 'IN_27',
    convertToDisplay: (value) => (value),
    convertToValue: (value) => Math.round(parseFloat(value) * 10),
    placeholderKey: 'sec_volt_avg_placeholder',
    labelKey: 'sec_volt_avg_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  SecPulseCurr: {
    registerPath: ['SecPulseCurr'],
    register: 'IN_28',
    convertToDisplay: (value) => value,
    convertToValue: (value) => Math.round(parseFloat(value)),
    placeholderKey: 'sec_pulse_curr_placeholder',
    labelKey: 'sec_pulse_curr_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  SecCurrDensity: {
    registerPath: ['SecCurrDensity'],
    register: 'IN_29',
    convertToDisplay: (value) => value,
    convertToValue: (value) => Math.round(parseFloat(value)),
    placeholderKey: 'sec_curr_density_placeholder',
    labelKey: 'sec_curr_density_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  Spm: {
    registerPath: ['Spm'],
    register: 'IN_30',
    convertToDisplay: (value) => value,
    convertToValue: (value) => Math.round(parseFloat(value)),
    placeholderKey: 'spm_placeholder',
    labelKey: 'spm_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  PriCurrAvg: {
    registerPath: ['PriCurrAvg'],
    register: 'IN_32',
    convertToDisplay: (value) => value,
    convertToValue: (value) => Math.round(parseFloat(value)),
    placeholderKey: 'pri_curr_avg_placeholder',
    labelKey: 'pri_curr_avg_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AppPower: {
    registerPath: ['AppPower'],
    register: 'IN_33',
    convertToDisplay: (value) => (value / 10).toFixed(1),
    convertToValue: (value) => Math.round(parseFloat(value) * 10),
    placeholderKey: 'app_power_placeholder',
    labelKey: 'app_power_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AuxCurr: {
    registerPath: ['AuxCurr'],
    register: 'IN_34',
    convertToDisplay: (value) => value,
    convertToValue: (value) => Math.round(parseFloat(value)),
    placeholderKey: 'aux_curr_placeholder',
    labelKey: 'aux_curr_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  SecVoltPeak: {
    registerPath: ['SecVoltPeak'],
    register: 'IN_35',
    convertToDisplay: (value) => (value / 10).toFixed(1),
    convertToValue: (value) => Math.round(parseFloat(value) * 10),
    placeholderKey: 'sec_volt_peak_placeholder',
    labelKey: 'sec_volt_peak_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  SecVoltValley: {
    registerPath: ['SecVoltValley'],
    register: 'IN_36',
    convertToDisplay: (value) => (value / 10).toFixed(1),
    convertToValue: (value) => Math.round(parseFloat(value) * 10),
    placeholderKey: 'sec_volt_valley_placeholder',
    labelKey: 'sec_volt_valley_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  SecCurrPeak: {
    registerPath: ['SecCurrPeak'],
    register: 'IN_37',
    convertToDisplay: (value) => value,
    convertToValue: (value) => Math.round(parseFloat(value)),
    placeholderKey: 'sec_curr_peak_placeholder',
    labelKey: 'sec_curr_peak_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  SecCurrAvg: {
    registerPath: ['SecCurrAvg'],
    register: 'IN_38',
    convertToDisplay: (value) => value,
    convertToValue: (value) => Math.round(parseFloat(value)),
    placeholderKey: 'sec_curr_avg_placeholder',
    labelKey: 'sec_curr_avg_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  SchedRapdelay: {
    registerPath: ['SchedRapdelay'],
    register: 'IN_39',
    convertToDisplay: (value) => value,
    convertToValue: (value) => Math.round(parseFloat(value)),
    placeholderKey: 'sched_rapdelay_placeholder',
    labelKey: 'sched_rapdelay_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AccumulatedSparks: {
    registerPath: ['AccumulatedSparks'],
    register: ['IN_42', 'IN_43'],
    convertToDisplay: (value) => value,
    convertToValue: (value) => Math.round(parseFloat(value)),
    placeholderKey: 'accumulated_sparks_placeholder',
    labelKey: 'accumulated_sparks_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AccumulatedArcs: {
    registerPath: ['AccumulatedArcs'],
    register: ['IN_44', 'IN_45'],
    convertToDisplay: (value) => value,
    convertToValue: (value) => Math.round(parseFloat(value)),
    placeholderKey: 'accumulated_arcs_placeholder',
    labelKey: 'accumulated_arcs_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AccumulatedDoublesparks: {
    registerPath: ['AccumulatedDoublesparks'],
    register: ['IN_46', 'IN_47'],
    convertToDisplay: (value) => value,
    convertToValue: (value) => Math.round(parseFloat(value)),
    placeholderKey: 'accumulated_doublesparks_placeholder',
    labelKey: 'accumulated_doublesparks_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  EpoqOptFR: {
    registerPath: ['EpoqOptFR'],
    register: 'IN_51',
    convertToDisplay: (value) => value,
    convertToValue: (value) => Math.round(parseFloat(value)),
    placeholderKey: 'epoq_opt_fr_placeholder',
    labelKey: 'epoq_opt_fr_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AmbientTemp: {
    registerPath: ['AmbientTemp'],
    register: 'IN_58',
    convertToDisplay: (value) => value,
    convertToValue: (value) => Math.round(parseFloat(value)),
    placeholderKey: 'ambient_temp_placeholder',
    labelKey: 'ambient_temp_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  LineFreq: {
    registerPath: ['LineFreq'],
    register: 'IN_59',
    convertToDisplay: (value) => (value / 10).toFixed(1),
    convertToValue: (value) => Math.round(parseFloat(value) * 10),
    placeholderKey: 'line_freq_placeholder',
    labelKey: 'line_freq_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  OpacityMom: {
    registerPath: ['OpacityMom'],
    register: 'IN_73',
    convertToDisplay: (value) => (value / 100).toFixed(2),
    convertToValue: (value) => Math.round(parseFloat(value) * 100),
    placeholderKey: 'opacity_mom_placeholder',
    labelKey: 'opacity_mom_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  OpacityAvg: {
    registerPath: ['OpacityAvg'],
    register: 'IN_74',
    convertToDisplay: (value) => (value / 100).toFixed(2),
    convertToValue: (value) => Math.round(parseFloat(value) * 100),
    placeholderKey: 'opacity_avg_placeholder',
    labelKey: 'opacity_avg_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  TotPowerAct: {
    registerPath: ['TotPowerAct'],
    register: 'IN_85',
    convertToDisplay: (value) => (value / 10).toFixed(1),
    convertToValue: (value) => Math.round(parseFloat(value) * 10),
    placeholderKey: 'tot_power_act_placeholder',
    labelKey: 'tot_power_act_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  SumAlarm: {
    registerPath: ['SumAlarm'],
    register: 'DI_0',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'sum_alarm_placeholder',
    labelKey: 'sum_alarm_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AlTempHighW: {
    registerPath: ['AlTempHighW'],
    register: 'DI_1',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'al_temp_high_w_placeholder',
    labelKey: 'al_temp_high_w_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AlTempHighT: {
    registerPath: ['AlTempHighT'],
    register: 'DI_2',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'al_temp_high_t_placeholder',
    labelKey: 'al_temp_high_t_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AlOilW: {
    registerPath: ['AlOilW'],
    register: 'DI_3',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'al_oil_w_placeholder',
    labelKey: 'al_oil_w_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AlOilT: {
    registerPath: ['AlOilT'],
    register: 'DI_4',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'al_oil_t_placeholder',
    labelKey: 'al_oil_t_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AlLvIsolationT: {
    registerPath: ['AlLvIsolationT'],
    register: 'DI_5',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'al_lv_isolation_t_placeholder',
    labelKey: 'al_lv_isolation_t_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AlHvSafetyT: {
    registerPath: ['AlHvSafetyT'],
    register: 'DI_6',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'al_hv_safety_t_placeholder',
    labelKey: 'al_hv_safety_t_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AlScrTempHighT: {
    registerPath: ['AlScrTempHighT'],
    register: 'DI_7',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'al_scr_temp_high_t_placeholder',
    labelKey: 'al_scr_temp_high_t_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AlAcCurrHighT: {
    registerPath: ['AlAcCurrHighT'],
    register: 'DI_8',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'al_ac_curr_high_t_placeholder',
    labelKey: 'al_ac_curr_high_t_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AlDcVoltLowT: {
    registerPath: ['AlDcVoltLowT'],
    register: 'DI_9',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'al_dc_volt_low_t_placeholder',
    labelKey: 'al_dc_volt_low_t_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AlDcVoltLowW: {
    registerPath: ['AlDcVoltLowW'],
    register: 'DI_10',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'al_dc_volt_low_w_placeholder',
    labelKey: 'al_dc_volt_low_w_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AlDcVoltHighT: {
    registerPath: ['AlDcVoltHighT'],
    register: 'DI_11',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'al_dc_volt_high_t_placeholder',
    labelKey: 'al_dc_volt_high_t_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AlNoContactorT: {
    registerPath: ['AlNoContactorT'],
    register: 'DI_12',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'al_no_contactor_t_placeholder',
    labelKey: 'al_no_contactor_t_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AlRealtimeClockReiniW: {
    registerPath: ['AlRealtimeClockReiniW'],
    register: 'DI_13',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'al_realtime_clock_reini_w_placeholder',
    labelKey: 'al_realtime_clock_reini_w_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AlWatchDogResetT: {
    registerPath: ['AlWatchDogResetT'],
    register: 'DI_14',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'al_watch_dog_reset_t_placeholder',
    labelKey: 'al_watch_dog_reset_t_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AlControllerRestartedT: {
    registerPath: ['AlControllerRestartedT'],
    register: 'DI_15',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'al_controller_restarted_t_placeholder',
    labelKey: 'al_controller_restarted_t_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AlIoGrp1W: {
    registerPath: ['AlIoGrp1W'],
    register: 'DI_16',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'al_io_grp1_w_placeholder',
    labelKey: 'al_io_grp1_w_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AlIoGrp2W: {
    registerPath: ['AlIoGrp2W'],
    register: 'DI_17',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'al_io_grp2_w_placeholder',
    labelKey: 'al_io_grp2_w_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AlIoGrp3W: {
    registerPath: ['AlIoGrp3W'],
    register: 'DI_18',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'al_io_grp3_w_placeholder',
    labelKey: 'al_io_grp3_w_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AlIoGrp4W: {
    registerPath: ['AlIoGrp4W'],
    register: 'DI_19',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'al_io_grp4_w_placeholder',
    labelKey: 'al_io_grp4_w_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AlRapSeqOffW: {
    registerPath: ['AlRapSeqOffW'],
    register: 'DI_20',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'al_rap_seq_off_w_placeholder',
    labelKey: 'al_rap_seq_off_w_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AlRapSeqContW: {
    registerPath: ['AlRapSeqContW'],
    register: 'DI_21',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'al_rap_seq_cont_w_placeholder',
    labelKey: 'al_rap_seq_cont_w_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AlTrptOffW: {
    registerPath: ['AlTrptOffW'],
    register: 'DI_22',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'al_trpt_off_w_placeholder',
    labelKey: 'al_trpt_off_w_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AlExtern1W: {
    registerPath: ['AlExtern1W'],
    register: 'DI_23',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'al_extern1_w_placeholder',
    labelKey: 'al_extern1_w_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AlExtern1T: {
    registerPath: ['AlExtern1T'],
    register: 'DI_24',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'al_extern1_t_placeholder',
    labelKey: 'al_extern1_t_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AlExtern2W: {
    registerPath: ['AlExtern2W'],
    register: 'DI_25',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'al_extern2_w_placeholder',
    labelKey: 'al_extern2_w_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AlExtern2T: {
    registerPath: ['AlExtern2T'],
    register: 'DI_26',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'al_extern2_t_placeholder',
    labelKey: 'al_extern2_t_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AlExtern3W: {
    registerPath: ['AlExtern3W'],
    register: 'DI_27',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'al_extern3_w_placeholder',
    labelKey: 'al_extern3_w_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AlExtern3T: {
    registerPath: ['AlExtern3T'],
    register: 'DI_28',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'al_extern3_t_placeholder',
    labelKey: 'al_extern3_t_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AlExtern4W: {
    registerPath: ['AlExtern4W'],
    register: 'DI_29',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'al_extern4_w_placeholder',
    labelKey: 'al_extern4_w_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AlExtern4T: {
    registerPath: ['AlExtern4T'],
    register: 'DI_30',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'al_extern4_t_placeholder',
    labelKey: 'al_extern4_t_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AlEpoqSprkLoVW: {
    registerPath: ['AlEpoqSprkLoVW'],
    register: 'DI_31',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'al_epoq_sprk_lo_v_w_placeholder',
    labelKey: 'al_epoq_sprk_lo_v_w_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AlEpoqRefMeasW: {
    registerPath: ['AlEpoqRefMeasW'],
    register: 'DI_32',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'al_epoq_ref_meas_w_placeholder',
    labelKey: 'al_epoq_ref_meas_w_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AlVIPrevW: {
    registerPath: ['AlVIPrevW'],
    register: 'DI_33',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'al_vi_prev_w_placeholder',
    labelKey: 'al_vi_prev_w_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  MasterSumAlarm: {
    registerPath: ['MasterSumAlarm'],
    register: 'DI_34',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'master_sum_alarm_placeholder',
    labelKey: 'master_sum_alarm_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AlFactoryResetW: {
    registerPath: ['AlFactoryResetW'],
    register: 'DI_35',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'al_factory_reset_w_placeholder',
    labelKey: 'al_factory_reset_w_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AlExtern5W: {
    registerPath: ['AlExtern5W'],
    register: 'DI_36',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'al_extern5_w_placeholder',
    labelKey: 'al_extern5_w_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AlExtern5T: {
    registerPath: ['AlExtern5T'],
    register: 'DI_37',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'al_extern5_t_placeholder',
    labelKey: 'al_extern5_t_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AlExtern6W: {
    registerPath: ['AlExtern6W'],
    register: 'DI_38',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'al_extern6_w_placeholder',
    labelKey: 'al_extern6_w_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AlExtern6T: {
    registerPath: ['AlExtern6T'],
    register: 'DI_39',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'al_extern6_t_placeholder',
    labelKey: 'al_extern6_t_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AlLocalBlockWriteW: {
    registerPath: ['AlLocalBlockWriteW'],
    register: 'DI_40',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'al_local_block_write_w_placeholder',
    labelKey: 'al_local_block_write_w_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AlProgMismatchW: {
    registerPath: ['AlProgMismatchW'],
    register: 'DI_41',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'al_prog_mismatch_w_placeholder',
    labelKey: 'al_prog_mismatch_w_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AlIoGrp5W: {
    registerPath: ['AlIoGrp5W'],
    register: 'DI_42',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'al_io_grp5_w_placeholder',
    labelKey: 'al_io_grp5_w_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  EpoqLastRefOK: {
    registerPath: ['EpoqLastRefOK'],
    register: 'DI_43',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'epoq_last_ref_ok_placeholder',
    labelKey: 'epoq_last_ref_ok_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  EpoqOptimizing: {
    registerPath: ['EpoqOptimizing'],
    register: 'DI_44',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'epoq_optimizing_placeholder',
    labelKey: 'epoq_optimizing_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  OpacCalib: {
    registerPath: ['OpacCalib'],
    register: 'DI_45',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'opac_calib_placeholder',
    labelKey: 'opac_calib_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  IoGrpAct1_IN: {
    registerPath: ['IoGrpAct1_IN'],
    register: 'DI_48',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'io_grp_act1_in_placeholder',
    labelKey: 'io_grp_act1_in_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  IoGrpAct1_OUT: {
    registerPath: ['IoGrpAct1_OUT'],
    register: 'DI_49',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'io_grp_act1_out_placeholder',
    labelKey: 'io_grp_act1_out_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  IoGrpAct2_IN: {
    registerPath: ['IoGrpAct2_IN'],
    register: 'DI_50',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'io_grp_act2_in_placeholder',
    labelKey: 'io_grp_act2_in_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  IoGrpAct2_OUT: {
    registerPath: ['IoGrpAct2_OUT'],
    register: 'DI_51',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'io_grp_act2_out_placeholder',
    labelKey: 'io_grp_act2_out_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  IoGrpAct3_IN: {
    registerPath: ['IoGrpAct3_IN'],
    register: 'DI_52',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'io_grp_act3_in_placeholder',
    labelKey: 'io_grp_act3_in_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  IoGrpAct3_OUT: {
    registerPath: ['IoGrpAct3_OUT'],
    register: 'DI_53',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'io_grp_act3_out_placeholder',
    labelKey: 'io_grp_act3_out_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  IoGrpAct4_IN: {
    registerPath: ['IoGrpAct4_IN'],
    register: 'DI_54',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'io_grp_act4_in_placeholder',
    labelKey: 'io_grp_act4_in_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  IoGrpAct4_OUT: {
    registerPath: ['IoGrpAct4_OUT'],
    register: 'DI_55',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'io_grp_act4_out_placeholder',
    labelKey: 'io_grp_act4_out_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  IoGrpAct5_IN: {
    registerPath: ['IoGrpAct5_IN'],
    register: 'DI_56',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'io_grp_act5_in_placeholder',
    labelKey: 'io_grp_act5_in_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  IoGrpAct5_OUT: {
    registerPath: ['IoGrpAct5_OUT'],
    register: 'DI_57',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'io_grp_act5_out_placeholder',
    labelKey: 'io_grp_act5_out_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AlProgUpdatedT: {
    registerPath: ['AlProgUpdatedT'],
    register: 'DI_80',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'al_prog_updated_t_placeholder',
    labelKey: 'al_prog_updated_t_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  SumAlarmT: {
    registerPath: ['SumAlarmT'],
    register: 'DI_82',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'sum_alarm_t_placeholder',
    labelKey: 'sum_alarm_t_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  SumAlarmW: {
    registerPath: ['SumAlarmW'],
    register: 'DI_85',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'sum_alarm_w_placeholder',
    labelKey: 'sum_alarm_w_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AlLossOfSyncT: {
    registerPath: ['AlLossOfSyncT'],
    register: 'DI_86',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'al_loss_of_sync_t_placeholder',
    labelKey: 'al_loss_of_sync_t_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  TrOnStatus: {
    registerPath: ['TrOnStatus'],
    register: 'DI_87',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'tr_on_status_placeholder',
    labelKey: 'tr_on_status_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  Measurement: {
    registerPath: ['Measurement'],
    register: 'DI_88',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'measurement_placeholder',
    labelKey: 'measurement_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  CollectorRapping: {
    registerPath: ['CollectorRapping'],
    register: 'DI_89',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'collector_rapping_placeholder',
    labelKey: 'collector_rapping_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  TrOn: {
    registerPath: ['TrOn'],
    register: 'CO_16384',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'tr_on_placeholder',
    labelKey: 'tr_on_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  Master: {
    registerPath: ['Master'],
    register: 'CO_16388',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'master_placeholder',
    labelKey: 'master_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  ActModeEpoq: {
    registerPath: ['ActModeEpoq'],
    register: 'CO_16385',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'act_mode_epoq_placeholder',
    labelKey: 'act_mode_epoq_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  ActModeRappAll: {
    registerPath: ['ActModeRappAll'],
    register: 'CO_16386',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'act_mode_rapp_all_placeholder',
    labelKey: 'act_mode_rapp_all_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  ActModeOpOpt: {
    registerPath: ['ActModeOpOpt'],
    register: 'CO_16387',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'act_mode_op_opt_placeholder',
    labelKey: 'act_mode_op_opt_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  Mode: {
    registerPath: ['Mode'],
    register: 'HO_1041',
    convertToDisplay: (value) => value + 1,
    convertToValue: (value) => parseInt(value) - 1,
    placeholderKey: 'mode_placeholder',
    labelKey: 'mode_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box',
    }
  },
  DI01: {
    registerPath: ['DI01'],
    register: 'DI_64',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'di01_placeholder',
    labelKey: 'di01_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  DI02: {
    registerPath: ['DI02'],
    register: 'DI_65',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'di02_placeholder',
    labelKey: 'di02_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  DI03: {
    registerPath: ['DI03'],
    register: 'DI_66',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'di03_placeholder',
    labelKey: 'di03_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  DI04: {
    registerPath: ['DI04'],
    register: 'DI_67',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'di04_placeholder',
    labelKey: 'di04_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  DI05: {
    registerPath: ['DI05'],
    register: 'DI_68',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'di05_placeholder',
    labelKey: 'di05_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  DI06: {
    registerPath: ['DI06'],
    register: 'DI_69',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'di06_placeholder',
    labelKey: 'di06_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  DI07: {
    registerPath: ['DI07'],
    register: 'DI_70',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'di07_placeholder',
    labelKey: 'di07_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  DI08: {
    registerPath: ['DI08'],
    register: 'DI_71',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'di08_placeholder',
    labelKey: 'di08_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  DI09: {
    registerPath: ['DI09'],
    register: 'DI_72',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'di09_placeholder',
    labelKey: 'di09_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  DI10: {
    registerPath: ['DI10'],
    register: 'DI_73',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'di10_placeholder',
    labelKey: 'di10_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  DI11: {
    registerPath: ['DI11'],
    register: 'DI_74',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'di11_placeholder',
    labelKey: 'di11_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  DI12: {
    registerPath: ['DI12'],
    register: 'DI_75',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'di12_placeholder',
    labelKey: 'di12_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  DI13: {
    registerPath: ['DI13'],
    register: 'DI_76',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'di13_placeholder',
    labelKey: 'di13_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  DI14: {
    registerPath: ['DI14'],
    register: 'DI_77',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'di14_placeholder',
    labelKey: 'di14_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  DI15: {
    registerPath: ['DI15'],
    register: 'DI_78',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'di15_placeholder',
    labelKey: 'di15_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  DI16: {
    registerPath: ['DI16'],
    register: 'DI_79',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'di16_placeholder',
    labelKey: 'di16_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  DI17: {
    registerPath: ['DI17'],
    register: 'CO_94',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'di17_placeholder',
    labelKey: 'di17_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  DI18: {
    registerPath: ['DI18'],
    register: 'CO_95',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'di18_placeholder',
    labelKey: 'di18_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  NAME1: {
    registerPath: ['NAME1'],
    register: 'HO_1280',
    convertToDisplay: (value) => value,
    convertToValue: (value) => value,
    placeholderKey: 'name1_placeholder',
    labelKey: 'name1_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  NAME2: {
    registerPath: ['NAME2'],
    register: 'HO_1281',
    convertToDisplay: (value) => value,
    convertToValue: (value) => value,
    placeholderKey: 'name2_placeholder',
    labelKey: 'name2_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  NAME3: {
    registerPath: ['NAME3'],
    register: 'HO_1282',
    convertToDisplay: (value) => value,
    convertToValue: (value) => value,
    placeholderKey: 'name3_placeholder',
    labelKey: 'name3_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  NAME4: {
    registerPath: ['NAME4'],
    register: 'HO_1283',
    convertToDisplay: (value) => value,
    convertToValue: (value) => value,
    placeholderKey: 'name4_placeholder',
    labelKey: 'name4_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  NAME5: {
    registerPath: ['NAME5'],
    register: 'HO_1284',
    convertToDisplay: (value) => value,
    convertToValue: (value) => value,
    placeholderKey: 'name5_placeholder',
    labelKey: 'name5_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  NAME6: {
    registerPath: ['NAME6'],
    register: 'HO_1285',
    convertToDisplay: (value) => value,
    convertToValue: (value) => value,
    placeholderKey: 'name6_placeholder',
    labelKey: 'name6_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  NAME7: {
    registerPath: ['NAME7'],
    register: 'HO_1286',
    convertToDisplay: (value) => value,
    convertToValue: (value) => value,
    placeholderKey: 'name7_placeholder',
    labelKey: 'name7_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  NAME8: {
    registerPath: ['NAME8'],
    register: 'HO_1287',
    convertToDisplay: (value) => value,
    convertToValue: (value) => value,
    placeholderKey: 'name8_placeholder',
    labelKey: 'name8_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  NAME9: {
    registerPath: ['NAME9'],
    register: 'HO_1288',
    convertToDisplay: (value) => value,
    convertToValue: (value) => value,
    placeholderKey: 'name9_placeholder',
    labelKey: 'name9_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  NAME10: {
    registerPath: ['NAME10'],
    register: 'HO_1289',
    convertToDisplay: (value) => value,
    convertToValue: (value) => value,
    placeholderKey: 'name10_placeholder',
    labelKey: 'name10_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  NAME11: {
    registerPath: ['NAME11'],
    register: 'HO_1290',
    convertToDisplay: (value) => value,
    convertToValue: (value) => value,
    placeholderKey: 'name11_placeholder',
    labelKey: 'name11_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  NAME12: {
    registerPath: ['NAME12'],
    register: 'HO_1291',
    convertToDisplay: (value) => value,
    convertToValue: (value) => value,
    placeholderKey: 'name12_placeholder',
    labelKey: 'name12_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  DO01: {
    registerPath: ['DO01'],
    register: 'CO_16432',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'do01_placeholder',
    labelKey: 'do01_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  DO02: {
    registerPath: ['DO02'],
    register: 'CO_16433',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'do02_placeholder',
    labelKey: 'do02_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  DO03: {
    registerPath: ['DO03'],
    register: 'CO_16434',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'do03_placeholder',
    labelKey: 'do03_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  DO04: {
    registerPath: ['DO04'],
    register: 'CO_16435',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'do04_placeholder',
    labelKey: 'do04_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  DO05: {
    registerPath: ['DO05'],
    register: 'CO_16436',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'do05_placeholder',
    labelKey: 'do05_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  DO06: {
    registerPath: ['DO06'],
    register: 'CO_16437',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'do06_placeholder',
    labelKey: 'do06_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  DO07: {
    registerPath: ['DO07'],
    register: 'CO_16438',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'do07_placeholder',
    labelKey: 'do07_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  ActModeFiringRatio: {
    registerPath: ['ActModeFiringRatio'],
    register: 'HO_1040',
    convertToDisplay: (value) => (value ).toFixed(2),
    convertToValue: (value) => Math.round(parseFloat(value) * 100),
    placeholderKey: 'act_mode_firing_ratio_placeholder',
    labelKey: 'act_mode_firing_ratio_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  ActModeVoltPeak: {
    registerPath: ['ActModeVoltPeak'],
    register: 'HO_1042',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'act_mode_volt_peak_placeholder',
    labelKey: 'act_mode_volt_peak_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AO1: {
    registerPath: ['AO1'],
    register: 'HO_1248',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'ao1_placeholder',
    labelKey: 'ao1_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  AO2: {
    registerPath: ['AO2'],
    register: 'HO_1249',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'ao2_placeholder',
    labelKey: 'ao2_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  TESTMODE: {
    registerPath: ['TESTMODE'],
    register: 'CO_16394',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'testmode_placeholder',
    labelKey: 'testmode_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  SUMALARMRESETREV: {
    registerPath: ['SUMALARMRESETREV'],
    register: 'CO_16392',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'sumalarmresetrev_placeholder',
    labelKey: 'sumalarmresetrev_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  FIELDPOSITION: {
    registerPath: ['FIELDPOSITION'],
    register: 'HO_1112',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'fieldposition_placeholder',
    labelKey: 'fieldposition_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  CELLPOSITION: {
    registerPath: ['CELLPOSITION'],
    register: 'HO_1115',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'cellposition_placeholder',
    labelKey: 'cellposition_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  TESTSECCURR: {
    registerPath: ['TESTSECCURR'],
    register: 'IN_96',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'testseccurr_placeholder',
    labelKey: 'testseccurr_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  TESTSECVOLT: {
    registerPath: ['TESTSECVOLT'],
    register: 'IN_97',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'testsecvolt_placeholder',
    labelKey: 'testsecvolt_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  TESTPRIMCURRRMS: {
    registerPath: ['TESTPRIMCURRRMS'],
    register: 'IN_98',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'testprimcurrrms_placeholder',
    labelKey: 'testprimcurrrms_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  TESTPRIMVOLTRMS: {
    registerPath: ['TESTPRIMVOLTRMS'],
    register: 'IN_99',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'testprimvoltrms_placeholder',
    labelKey: 'testprimvoltrms_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  },
  TESTAUXINP1: {
    registerPath: ['TESTAUXINP1'],
    register: 'IN_100',
    convertToDisplay: (value) => value,
    convertToValue: (value) => parseInt(value),
    placeholderKey: 'testauxinp1_placeholder',
    labelKey: 'testauxinp1_label',
    style: {
      height: '30px',
      lineHeight: '30px',
      padding: '5px 10px',
      minWidth: '150px',
      boxSizing: 'border-box'
    }
  }
};
      
export function getRegisterInfo(registerPath) {
    console.log('getRegisterInfo called with:', registerPath);
    const key = Array.isArray(registerPath) ? registerPath[0] : registerPath;
    const info = modbusRegisterMatrix[key];
    console.log('getRegisterInfo returned:', info);
    console.log('convertToDisplay type:', typeof info?.convertToDisplay);
    console.log('convertToValue type:', typeof info?.convertToValue);
    return info || null;
  }