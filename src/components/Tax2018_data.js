import vueSlider from 'vue-slider-component'

function HasNBCA (Yr) {
  if (Yr.substring(0, 4) >= 2007) {
    return true
  } else {
    return false
  }
}

function leftStr (s, i) {
  var s1
  s1 = '' + s
  return s1.substring(0, i)
}

function rightStr (s, i) {
  var s1, l
  s1 = '' + s
  l = s1.length
  return s1.substring(l - i, l)
}

function trimStr (s) {
  var s1, i, j, l, Chrs2Trim
  s1 = '' + s
  l = s1.length
  if (l === 0) return ''
  Chrs2Trim = ' \t'
  i = 0
  while (i < l && Chrs2Trim.indexOf(s1.charAt(i)) > -1) {
    i++
  }
  j = l - 1
  while (j >= 0 && Chrs2Trim.indexOf(s1.charAt(j)) > -1) {
    j--
  }
  if (i <= j) {
    return s1.substring(i, j - i + 1)
  } else {
    return ''
  }
}

function CInt (s) {
  var s1
  s1 = trimComma(s)
  if (s1.length > 0) {
    return parseInt(s1)
  } else {
    return 0
  }
}

function CDbl (s) {
  var s1
  s1 = trimComma(s)
  if (s1.length > 0) {
    return parseFloat(s1)
  } else {
    return 0
  }
}

function trimComma (s) {
  var s1, l, rs, i, c
  s1 = trimStr(s)
  l = s1.length
  rs = ''
  for (i = 0; i < l; i++) {
    c = s1.charAt(i)
    if (c !== ',') rs = rs + c
  }
  return rs
}

function FormatMoney (InNum) {
  var tmpStr, NumStr
  var i, j, k, l
  tmpStr = trimStr(InNum)
  NumStr = tmpStr
  // l = tmpStr.length
  // j = Math.floor((l - 1) / 3) - 1
  // for (i = 0; i <= j; i++) {
  //   k = 3 + i * 4
  //   NumStr = leftStr(tmpStr, l - k) + ',' + rightStr(tmpStr, k)
  //   tmpStr = NumStr
  //   l = l + 1
  // }
  return NumStr
}

function NullZero (obj, e) {
  e = Math.floor(e)
  if (e === 0 || e === 6 || e === 7 || e === 8 || e === 9 || e === 10) {
    if (IsNIL(obj)) obj.value = '0'
  } else {
    obj.value = ''
    obj.focus()
  }
}

function SetTxt (obj, v) {
  // if (obj.value !== v) obj.value = v
  obj = v
  return v
}

function FormatInput (IncStr, ll, ul) {
  var Istr
  Istr = trimStr(IncStr)
  if (Istr === '') {
    return '0'
  } else if (!IsNumber(Istr)) {
    return '*'
  } else if (Math.abs(CDbl(Istr)) < ll) {
    return '-'
  } else if (Math.abs(CDbl(Istr)) > ul) {
    return '+'
  } else {
    return FormatMoney(Math.floor(Math.abs(CDbl(Istr))))
  }
}

function IsNumber (Istr) {
  var AllowChars, i
  AllowChars = '0123456789,'
  for (i = 0; i < Istr.length; i++) {
    if (AllowChars.indexOf(Istr.charAt(i)) === -1) {
      return false
    }
  }
  return true
}

function IsNIL (obj) {
  var AllowChars, i, ov
  AllowChars = '0 '
  ov = obj.toString() // .value
  for (i = 0; i < ov.length; i++) {
    if (AllowChars.indexOf(ov.charAt(i)) === -1) {
      return false
    }
  }
  return true
}

function NotNIL (obj) {
  return !IsNIL(obj)
}

function ClrTxt (obj) {
  obj.value = '0'
}

export default {
  name: 'tax_result',
  components: {
    vueSlider
  },
  props: [
    'martial_status',
    'slfIncome',
    'spsIncome',
    'slfResi',
    'spsResi',
    'slfOE',
    'spsOE',
    'slfSEE',
    'spsSEE',
    'slfDona',
    'spsDona',
    'slfMpf',
    'spsMpf',
    'slfLoan',
    'spsLoan',
    'slfElder',
    'slfDisdep',
    'slfERCE',
    'spsElder',
    'spsDisdep',
    'spsERCE',
    'NBbb',
    'CAbb',
    'single_parent',
    'brosis_dep',
    'resi_parent',
    'non_resi_parent',
    'resi_parent_5560',
    'non_resi_parent_5560',
    'NBbb_DIS',
    'CAbb_DIS',
    'brosis_dep_DIS',
    'resi_parent_DIS',
    'non_resi_parent_DIS',
    'spouse_disabled_dependent_DIS',
    'STCOut1',
    'slfMedInsu', // onday_onday(6)
    'spsMedInsu',
    'self_disabled_DIS',
    'sps_disabled_DIS'
  ],
  data () {
    return {
      msg: 'Welcome to Your Vue.js PWA 1',
      show_changes: false,
      // martial_status: 'M',
      joint: false,
      taxtype: 10,

      STCIn2: 0,
      STCIn3: 0,
      STCIn8: false,

      s_tooltip: 'always', // 'hover',
      s_Elder_min: 0,
      s_Elder_max: 4,
      s_bb_min: 0,
      s_bb_max: 9,

      STCIn21: 0, // 1,
      STCIn4: 0, // 1,
      STCIn23: 0, // 1,
      STCIn5: 0, // 1,
      STCIn6: 0, // 1,
      STCIn7: 0, // 1,
      STCIn17: 0, // 1,
      STCIn18: 0, // 1,

      STCIn10: 0,
      STCIn22: 0,
      STCIn11: 0,
      STCIn12: 0,
      STCIn13: 0,
      STCIn9: 0,

      STCIn14: 0,

      STCOut2018: new Array(80),
      ADPNo: 1,
      ChCount: undefined,
      ChCount_: undefined,
      CurJntTP: undefined,
      CurTP: undefined,
      DDAspsGranted: undefined,
      DPNo: 2,
      InLoopCnt: undefined,
      InLoopLim: 20000,
      MinJntTP: undefined,
      MinJntTP1: undefined,
      MinTP: undefined,
      MinTP1: undefined,
      SADPNo: 1,
      SDPNo: 2,
      STCIn5_: undefined,
      STCIn6_: undefined,
      STCIn7_: undefined,
      STCIn11_: undefined,
      STCIn12_: undefined,
      STCIn13_: undefined,
      STCIn17_: undefined,
      STCIn18_: undefined,
      TotalDIS_DA: undefined,
      jntNCIDDAsps: 0,
      jntTPDDAsps: 0,
      jointStdTP: 0,
      l: undefined,
      lMin: 0,
      lMin1: undefined,
      ld: undefined,
      ldMin: 0,
      ldMin1: undefined,
      m: undefined,
      mMin: 1,
      mMin1: undefined,
      md: undefined,
      mdMin: -1,
      mdMin1: undefined,
      n: undefined,
      nMin: 1,
      nMin1: undefined,
      netJointI: 0,
      netSpouseI: 0,
      netSelfI: 0,
      o: undefined,
      oMin: 1,
      oMin1: undefined,
      od: undefined,
      odMin: 0,
      odMin1: undefined,
      p: undefined,
      pMin: 1,
      pMin1: undefined,
      q: undefined,
      qMin: 1,
      qMin1: undefined,
      slfDIS_DA: undefined,
      slfDisC_No: undefined,
      slfMinNCI: undefined,
      slfMinNCI1: undefined,
      slfMinStd: undefined,
      slfMinStd1: undefined,
      slfNCI: 800000,
      slfNCItmp: undefined,
      slfStd: undefined,
      slfStdTP: 0,
      slfTP: undefined,
      spsDDA: undefined,
      spsMinStd: undefined,
      spsMinStd1: undefined,
      spsNCI: 0, // 600000,
      spsNCItmp: undefined,
      spsStd: undefined,
      spsStdTP: 0,
      spsTP: undefined,

      AssessYear: '2018-2019',
      AL_SING: 0,
      AAL_SING: 0,
      AL_MARR: 0,
      AAL_MARR: 0,
      SPA: 0,
      CA: [],
      NBCA: [],
      DBSA: 0,
      DPA: 0,
      ADPA: 0,
      DIS_DA: 0,
      SDPGPA: 0,
      SADPGPA: 0,
      VAPRP_RATE: 0,
      TAX_RANGE: [],
      TAX_RATE: [],
      TAX_RATE_R: 0,
      TAX: [],
      STD_RATE: 0,
      CLAWBACK: 0,
      CLAW_RATE: 0,
      N_TAX_RANGES: 0,
      ACC_RANGE: [],

      AASing: 0,
      AAMarr: 0,
      YrEnd: '',

      jntOE: 0,
      jntSEE: 0,
      STCMainRV: 0,

      oT3: '',
      oT4: '', // previous content of the textboxes (Approved Charitable Donations)
      T3tag: '0',
      T4tag: '0', // Approved Charitable Donations for joint assessment
      oT1: '0',
      oT2: '0', // previous content of the textboxes (Self Income and Spouse Income)
      oT11: '',
      oT12: '', // previous content of the textboxes (Contributions to MPF)
      T11tag: '0',
      T12tag: '0', //
      oT13: '0',
      oT14: '0', // previous content of the textboxes (Self & Spouse Value of All Places of Residence Provided)
      slic: false,
      spic: false, // Boolean (Self Income changed, Spouse Income changed)
      slvr: false,
      spvr: false, // Boolean (Change of Self & Spouse Value of All Places of Residence Provided)

      LimD_DonaLL: 0,
      LimD_DonaUL: 0,
      LimD_Education: 0,
      LimD_HomeLoan: 0,
      LimD_Elderly: 0,
      LimD_MPF: 0,
      LimD_rate_MPF: 0,
      LimP_rate_VAPRP: 0,

      sh_result: false,
      end: 0
    }
  },
  computed: {
    STCOut2 () {
      return this.STCOut2_func()
    },
    only_one_income () {
      return (parseFloat(this.slfIncome) === 0 || parseFloat(this.spsIncome) === 0)
    },
    last_pay () {
      var vm = this
      var min2017 = (vm.STCOut1[32] < vm.STCOut1[33]) ? vm.STCOut1[32] : vm.STCOut1[33]
      return min2017
    },
    min_saved () {
      var vm = this
      var min2018 = (vm.STCOut2[32] < vm.STCOut2[33]) ? vm.STCOut2[32] : vm.STCOut2[33]
      var min2017 = (vm.STCOut1[32] < vm.STCOut1[33]) ? vm.STCOut1[32] : vm.STCOut1[33]
      var saved_pay = min2018 - min2017
      return saved_pay
    },
    tax () {
      return {
        'martial_status': this.martial_status,
        'slfIncome': this.slfIncome,
        'spsIncome': this.spsIncome,
        'slfResi': this.slfResi,
        'spsResi': this.spsResi,
        'slfOE': this.slfOE,
        'spsOE': this.spsOE,
        'slfSEE': this.slfSEE,
        'spsSEE': this.spsSEE,
        'slfDona': this.slfDona,
        'spsDona': this.spsDona,
        'slfMpf': this.slfMpf,
        'spsMpf': this.spsMpf,
        'slfLoan': this.slfLoan,
        'spsLoan': this.spsLoan,
        'slfElder': this.slfElder,
        'slfDisdep': this.slfDisdep,
        'slfERCE': this.slfERCE,
        'spsElder': this.spsElder,
        'spsDisdep': this.spsDisdep,
        'spsERCE': this.spsERCE,
        'NBbb': this.NBbb,
        'CAbb': this.CAbb,
        'single_parent': this.single_parent,
        'brosis_dep': this.brosis_dep,
        'resi_parent': this.resi_parent,
        'non_resi_parent': this.non_resi_parent,
        'resi_parent_5560': this.resi_parent_5560,
        'non_resi_parent_5560': this.non_resi_parent_5560,
        'NBbb_DIS': this.NBbb_DIS,
        'CAbb_DIS': this.CAbb_DIS,
        'brosis_dep_DIS': this.brosis_dep_DIS,
        'resi_parent_DIS': this.resi_parent_DIS,
        'non_resi_parent_DIS': this.non_resi_parent_DIS,
        'spouse_disabled_dependent_DIS': this.spouse_disabled_dependent_DIS,
        'slfMedInsu': this.slfMedInsu, // onday_onday(7)
        'spsMedInsu': this.spsMedInsu,
        'self_disabled_DIS': this.self_disabled_DIS,
        'sps_disabled_DIS': this.sps_disabled_DIS
      }
    }
  },
  watch: {
    tax: function (val) {
      if (this.tax.martial_status === 'S' || this.tax.martial_status === 'M') {
        this.sh_result = false
      }
    }
  },
  methods: {
    toggleClass (var_name) {
      var vm = this
      vm[var_name] = !vm[var_name]
    },
    pop_up () {
      var vm = this
      var have_to_pay = 0 // 2018-19
      var saved_pay = 0
      if (vm.tax.martial_status !== 'M') {
        have_to_pay = vm.STCOut2[30]
      } else {
        if (vm.STCOut2[32] < vm.STCOut2[33]) {
          have_to_pay = vm.STCOut2[32]
        } else {
          if (parseFloat(vm.tax.slfIncome) === 0 || parseFloat(vm.tax.spsIncome) === 0) {
            have_to_pay = vm.STCOut2[32]
            if (parseFloat(vm.tax.slfIncome) === 0) {
              have_to_pay = vm.STCOut2[31]
            }
            if (parseFloat(vm.tax.spsIncome) === 0) {
              have_to_pay = vm.STCOut2[30]
            }
          } else {
            have_to_pay = vm.STCOut2[33]
          }
        }
      }
      if (vm.tax.martial_status !== 'M') {
        saved_pay = vm.STCOut2[30] - vm.STCOut1[30]
      } else {
        // 已婚
        var min2018 = (vm.STCOut2[32] < vm.STCOut2[33]) ? vm.STCOut2[32] : vm.STCOut2[33]
        var min2017 = (vm.STCOut1[32] < vm.STCOut1[33]) ? vm.STCOut1[32] : vm.STCOut1[33]
        saved_pay = min2018 - min2017
        // if (vm.STCOut2[32] < vm.STCOut2[33]) {
        //   saved_pay = vm.STCOut2[32] - vm.STCOut1[32]
        // } else {
        //   if (parseFloat(vm.tax.slfIncome) === 0 || parseFloat(vm.tax.spsIncome) === 0) {
        //     saved_pay = vm.STCOut2[32] - vm.STCOut1[32]
        //     if (parseFloat(vm.tax.slfIncome) === 0) {
        //       saved_pay = vm.STCOut2[31] - vm.STCOut1[31]
        //     }
        //     if (parseFloat(vm.tax.spsIncome) === 0) {
        //       saved_pay = vm.STCOut2[30] - vm.STCOut1[30]
        //     }
        //   } else {
        //     saved_pay = vm.STCOut2[33] - vm.STCOut1[33]
        //   }
        // }
      }
      vm.$parent.GA(have_to_pay, saved_pay)
      vm.toggleClass('sh_result')
      vm.$parent.$modal.show('new_budget')
    },
    make_STCOut2 () {
      this.STCOut2_func()
    },
    to_float (num) {
      return parseFloat(num).toFixed(2)
    },
    get_rate () { // onday_onday(6)
      var year = '2018-2019'
      this.YrEnd = year.split('-')[1]
      var i
      var ok = false
      // // //
      if (this.AssessYear === '2018-2019') {
        this.AL_SING = 132000 // PAL_SING
        this.AAL_SING = 0 // PAAL_SING
        this.AL_MARR = 264000 // PAL_MARR
        this.AAL_MARR = 0 // PAAL_MARR
        this.SPA = 132000 // PSPA
        this.CA[0] = 0
        this.CA[1] = 120000 * 1 // MOCK 100000
        this.CA[2] = 120000 * 2 // MOCK 200000
        this.CA[3] = 120000 * 3 // MOCK 300000
        this.CA[4] = 120000 * 4 // MOCK 400000
        this.CA[5] = 120000 * 5 // MOCK 500000
        this.CA[6] = 120000 * 6 // MOCK 600000
        this.CA[7] = 120000 * 7 // MOCK 700000
        this.CA[8] = 120000 * 8 // MOCK 800000
        this.CA[9] = 120000 * 9 // MOCK 900000
        // PCHILDNB_AL1  to PCHILDNB_AL9
        this.NBCA[0] = 0
        this.NBCA[1] = 120000 * 1 // MOCK 100000
        this.NBCA[2] = 120000 * 2 // MOCK 200000
        this.NBCA[3] = 120000 * 3 // MOCK 300000
        this.NBCA[4] = 120000 * 4 // MOCK 400000
        this.NBCA[5] = 120000 * 5 // MOCK 500000
        this.NBCA[6] = 120000 * 6 // MOCK 600000
        this.NBCA[7] = 120000 * 7 // MOCK 700000
        this.NBCA[8] = 120000 * 8 // MOCK 800000
        this.NBCA[9] = 120000 * 9 // MOCK 900000
        this.DBSA = 37500 // PDBSA
        this.DPA = 50000 // PDPAAMT 46000
        this.ADPA = 50000 // PADPAAMT 46000
        this.DIS_DA = 75000 // PDDA
        this.SDPGPA = 25000 // PSDPGPA 23000
        this.SADPGPA = 25000 // PSADPGPA 23000
        this.VAPRP_RATE = 10
        this.TAX_RANGE[0] = 0
        this.TAX_RANGE[1] = 50000 // MOCK 45000
        this.TAX_RANGE[2] = 50000 // MOCK 45000
        this.TAX_RANGE[3] = 50000 // MOCK 45000
        this.TAX_RANGE[4] = 50000
        this.TAX_RANGE[5] = 0
        this.TAX_RANGE[6] = 0
        this.TAX_RANGE[7] = 0
        this.TAX_RANGE[8] = 0
        this.TAX_RANGE[9] = 0
        this.TAX_RANGE[10] = 0
        this.TAX_RANGE[11] = 0
        this.TAX_RANGE[12] = 0
        this.TAX_RANGE[13] = 0
        this.TAX_RANGE[14] = 0
        this.TAX_RANGE[15] = 0
        this.TAX_RATE[0] = 0
        this.TAX_RATE[1] = 2 // MOCK 2
        this.TAX_RATE[2] = 6 // MOCK 7
        this.TAX_RATE[3] = 10 // MOCK 12
        this.TAX_RATE[4] = 14
        this.TAX_RATE[5] = 0
        this.TAX_RATE[6] = 0
        this.TAX_RATE[7] = 0
        this.TAX_RATE[8] = 0
        this.TAX_RATE[9] = 0
        this.TAX_RATE[10] = 0
        this.TAX_RATE[11] = 0
        this.TAX_RATE[12] = 0
        this.TAX_RATE[13] = 0
        this.TAX_RATE[14] = 0
        this.TAX_RATE[15] = 0
        this.TAX_RATE_R = 17
        this.TAX[0] = 0
        this.TAX[1] = 1000 // MOCK 900
        this.TAX[2] = 4000 // MOCK 4050
        this.TAX[3] = 9000 // MOCK 9450
        this.TAX[4] = 16000
        this.TAX[5] = 0
        this.TAX[6] = 0
        this.TAX[7] = 0
        this.TAX[8] = 0
        this.TAX[9] = 0
        this.TAX[10] = 0
        this.TAX[11] = 0
        this.TAX[12] = 0
        this.TAX[13] = 0
        this.TAX[14] = 0
        this.TAX[15] = 0
        this.STD_RATE = 15 // PSTANDRATE
        this.CLAWBACK = false // PCLAWBACK
        this.CLAW_RATE = 0 // PCLAWRATE
        ok = true
      }
      if (!ok) return false
      this.N_TAX_RANGES = 1
      var TAX_RATE = new Array(17)
      var TAX = new Array(16)
      var TAX_RANGE = new Array(16)
      var ACC_RANGE = new Array(16)

      for (i = 0; i <= 15; i++) {
        ACC_RANGE[i] = 0
        TAX_RATE[i] = this.TAX_RATE[i]
        TAX[i] = this.TAX[i]
        TAX_RANGE[i] = this.TAX_RANGE[i]
      }

      for (i = 2; i < 16; i++) {
        if (TAX_RATE[i] === 0) break
        if (TAX_RATE[i] !== TAX_RATE[this.N_TAX_RANGES]) {
          this.N_TAX_RANGES = this.N_TAX_RANGES + 1
          // TAX_RATE[this.N_TAX_RANGES] = this.TAX_RATE[i]
          // TAX_RANGE[this.N_TAX_RANGES] = this.TAX_RANGE[i]
          // TAX[this.N_TAX_RANGES] = this.TAX[i]
        } else {
          // TAX_RANGE[this.N_TAX_RANGES] = this.TAX_RANGE[this.N_TAX_RANGES] + this.TAX_RANGE[i]
          // TAX[this.N_TAX_RANGES] = this.TAX[i]
        }
      }

      ACC_RANGE[1] = TAX_RANGE[1]
      for (i = 2; i <= this.N_TAX_RANGES; i++) {
        ACC_RANGE[i] = ACC_RANGE[i - 1] + TAX_RANGE[i]
      }
      TAX_RATE[this.N_TAX_RANGES + 1] = this.TAX_RATE_R

      this.TAX_RATE = TAX_RATE
      this.TAX = TAX
      this.TAX_RANGE = TAX_RANGE
      this.ACC_RANGE = ACC_RANGE
      return true
    },
    get_deduction () { // onday_onday(7)
      var YrValue = '2018-2019'
      // parent.LSPYrEnd = YrValue
      // // //
      if (YrValue === '2018-2019') {
        this.LimD_DonaLL = 100
        this.LimD_DonaUL = 35
        this.LimD_Education = 100000
        this.LimD_HomeLoan = 100000
        this.LimD_Elderly = 100000 // MOCK 92000
        this.LimD_MPF = 18000
        this.LimD_rate_MPF = 5
        this.LimP_rate_VAPRP = 10
        return true
      }
      return false
    },
    IsNumber (Istr) {
      var AllowChars, i
      AllowChars = '0123456789,'
      for (i = 0; i < Istr.length; i++) {
        if (AllowChars.indexOf(Istr.charAt(i)) === -1) {
          return false
        }
      }
      return true
    },
    FormatInput (IncStr, ll, ul) {
      var Istr
      Istr = trimStr(IncStr)
      if (Istr === '') {
        return '0'
      } else if (!this.IsNumber(Istr)) {
        return '*'
      } else if (Math.abs(CDbl(Istr)) < ll) {
        return '-'
      } else if (Math.abs(CDbl(Istr)) > ul) {
        return '+'
      } else {
        return FormatMoney(Math.floor(Math.abs(CDbl(Istr))))
      }
    },
    D3OnChange () {
      var vm = this
      // console.log('pp', parseInt(vm.tax.CAbb_DIS, 10) > parseInt(vm.tax.CAbb, 10))
      if (parseInt(vm.tax.CAbb_DIS, 10) > parseInt(vm.tax.CAbb, 10)) {
        vm.tax.CAbb_DIS = parseInt(vm.tax.CAbb, 10)
      }
      if (vm.AssessYear === '2018-2019') {
        if (parseInt(vm.tax.CAbb, 10) + parseInt(vm.tax.NBbb, 10) > 9) {
          // ErrMsgDDA2()
          // setTimeout(function () {
          vm.tax.CAbb = 9 - parseInt(vm.tax.NBbb, 10)
          // console.log('www3', vm.tax.CAbb, parseInt(vm.tax.NBbb, 10), (9 - parseInt(vm.tax.NBbb, 10)))
          // }, 1)
        }
      }
    },
    D4OnChange () {
      var vm = this
      if (parseInt(vm.tax.CAbb_DIS, 10) > 0) {
        if (parseInt(vm.tax.CAbb_DIS, 10) > parseInt(vm.tax.CAbb, 10)) {
          // ErrMsgDDA()
          setTimeout(function () {
            vm.tax.CAbb_DIS = parseInt(vm.tax.CAbb, 10)
          }, 1)
        }
      }
    },
    D3aOnChange () {
      var vm = this
      console.log('qq', parseInt(vm.tax.NBbb_DIS, 10) > parseInt(vm.tax.NBbb, 10))
      if (parseInt(vm.tax.NBbb_DIS, 10) > parseInt(vm.tax.NBbb, 10)) {
        vm.tax.NBbb_DIS = parseInt(vm.tax.NBbb, 10)
      }
      if (parseInt(vm.tax.CAbb, 10) + parseInt(vm.tax.NBbb, 10) > 9) {
        // ErrMsgDDA2()
        setTimeout(function () {
          vm.tax.NBbb = 9 - parseInt(vm.tax.CAbb, 10)
        }, 1)
      }
    },
    D4aOnChange () {
      var vm = this
      if (parseInt(vm.tax.NBbb_DIS, 10) > 0) {
        if (parseInt(vm.tax.NBbb_DIS, 10) > parseInt(vm.tax.NBbb, 10)) {
          // ErrMsgDDA()
          setTimeout(function () {
            vm.tax.NBbb_DIS = parseInt(vm.tax.NBbb, 10)
          }, 1)
        }
      }
    },
    D5OnChange () {
      var vm = this
      var Num
      Num = parseFloat(vm.tax.brosis_dep)
      if (Num > 0) {
        if (!vm.CheckYear(1997)) {
          setTimeout(function () {
            vm.tax.brosis_dep = 0
          }, 1)
          Num = 0
        }
      }
      if (parseFloat(vm.tax.brosis_dep_DIS) > Num) {
        vm.tax.brosis_dep_DIS = Num
      }
    },
    D6OnChange () {
      var vm = this
      if (parseFloat(vm.tax.brosis_dep_DIS) > 0) {
        if (!vm.CheckYear(1997)) {
          setTimeout(function () {
            vm.tax.brosis_dep_DIS = 0
          }, 1)
        } else if (parseFloat(vm.tax.brosis_dep_DIS) > parseFloat(vm.tax.brosis_dep)) {
          // ErrMsgDDA()
          setTimeout(function () {
            vm.tax.brosis_dep_DIS = parseFloat(vm.tax.brosis_dep)
          }, 1)
        }
      }
    },
    D7OnChange () {
      var vm = this
      if (parseFloat(vm.tax.resi_parent_DIS) > parseFloat(vm.tax.resi_parent)) {
        vm.tax.resi_parent_DIS = parseFloat(vm.tax.resi_parent)
      }
    },
    D8OnChange () {
      var vm = this
      if (parseFloat(vm.tax.resi_parent_DIS) > 0) {
        if (!vm.CheckYear(1996)) {
          setTimeout(function () {
            vm.tax.resi_parent_DIS = 0
          }, 1)
        } else if (parseFloat(vm.tax.resi_parent_DIS) > parseFloat(vm.tax.resi_parent)) {
          // ErrMsgDDA()
          setTimeout(function () {
            vm.tax.resi_parent_DIS = parseFloat(vm.tax.resi_parent)
          }, 1)
        }
      }
    },
    D9OnChange () {
      var vm = this
      if (parseFloat(vm.tax.non_resi_parent_DIS) > parseFloat(vm.tax.non_resi_parent)) {
        vm.tax.non_resi_parent_DIS = parseFloat(vm.tax.non_resi_parent)
      }
    },
    D10OnChange () {
      var vm = this
      if (parseFloat(vm.tax.non_resi_parent_DIS) > 0) {
        if (!vm.CheckYear(1996)) {
          setTimeout(function () {
            vm.tax.non_resi_parent_DIS = 0
          }, 1)
        } else if (parseFloat(vm.tax.non_resi_parent_DIS) > parseFloat(vm.tax.non_resi_parent)) {
          // ErrMsgDDA()
          setTimeout(function () {
            vm.tax.non_resi_parent_DIS = parseFloat(vm.tax.non_resi_parent)
          }, 1)
        }
      }
    },
    T1OnBlur () {
      var vm = this
      var Income, ValueResidence, MustReset
      MustReset = false
      Income = vm.FormatInput(vm.tax.slfIncome, 0, 999999999)
      if (Income === '*') {
        // ErrMsg('你輸入的數值不正確 !')
        MustReset = true
      } else if (Income === '+') {
        // ErrMsg('你不可輸入超過 9 位數字的數值 !')
        MustReset = true
      }
      if (MustReset) {
        Income = ''
        // vm.tax.slfIncome.focus()
      }
      if (Income === '0') {
        vm.tax.spouse_disabled_dependent_DIS = false // '' + 0
        vm.tax.slfResi = '0'
      }
      vm.tax.slfIncome = Income
      if (Income !== '') {
        ValueResidence = vm.FormatInput(vm.tax.slfResi, 0, 999999999)
        console.log('t1a', Income, ValueResidence, CDbl(vm.tax.slfResi), ((vm.LimP_rate_VAPRP / 100) * CDbl(vm.tax.slfIncome)), vm.LimP_rate_VAPRP, CDbl(vm.slfIncome))
        if (ValueResidence !== '') {
          if (CDbl(vm.tax.slfResi) > ((vm.LimP_rate_VAPRP / 100) * CDbl(vm.tax.slfIncome))) {
            console.log('t1b', Income)
            // ErrMsg('你輸入港元' + ValueResidence + '。獲提供居所的租值不可超過你入息的' + vm.LimP_rate_VAPRP + '％。')
            // vm.tax.slfResi = '0'
            vm.tax.slfResi = '' + ((vm.LimP_rate_VAPRP / 100) * CDbl(vm.tax.slfIncome))
            // dF.T13.focus()
          }
        }
        vm.slic = (Income !== vm.oT1)
        vm.oT1 = Income
        vm.ChkDD(0)
      }
    },
    T2OnBlur () {
      var vm = this
      var Income, obj, MustReset, ValueResidence
      MustReset = false
      Income = vm.FormatInput(vm.tax.spsIncome, 0, 999999999)
      if (vm.tax.martial_status === 'S' && Income !== '0') {
        // ErrMsg('由於你並非已婚人士，因此你不能輸入配偶的入息。')
        MustReset = true
      } else if (Income === '*') {
        // ErrMsg('你輸入的數值不正確 !')
        MustReset = true
      } else if (Income === '+') {
        // ErrMsg('你不可輸入超過 9 位數字的數值 !')
        MustReset = true
      }
      if (MustReset) {
        Income = ''
        // vm.tax.spsIncome.focus()
      }
      if (Income === '0') {
        vm.tax.spsResi = '0'
      }
      vm.tax.spsIncome = Income
      if (Income !== '') {
        ValueResidence = vm.FormatInput(vm.tax.spsResi, 0, 999999999)
        if (ValueResidence !== '') {
          if (CDbl(vm.tax.spsResi) > ((vm.LimP_rate_VAPRP / 100) * CDbl(vm.tax.spsIncome))) {
            // ErrMsg('你輸入港元' + ValueResidence + '。獲提供居所的租值不可超過你入息的' + vm.LimP_rate_VAPRP + '％。')
            // vm.tax.spsResi = '0'
            vm.tax.spsResi = ((vm.LimP_rate_VAPRP / 100) * CDbl(vm.tax.spsIncome))
            // dF.T14.focus()
          }
        }
        vm.spic = (Income !== vm.oT2)
        vm.oT2 = Income
        vm.ChkDD(0)
      }
    },
    T13OnBlur () {
      var vm = this
      var Income, MustReset, ValueResidence
      MustReset = false
      Income = vm.FormatInput(vm.tax.slfIncome, 0, 999999999)
      ValueResidence = vm.FormatInput(vm.tax.slfResi, 0, 999999999)
      if (ValueResidence === '*') {
        // ErrMsg('你輸入的數值不正確 !')
        MustReset = true
      } else if (ValueResidence === '+') {
        // ErrMsg('你不可輸入超過 9 位數字的數值 !')
        MustReset = true
      } else if (CDbl(vm.tax.slfResi) > ((vm.LimP_rate_VAPRP / 100) * CDbl(vm.tax.slfIncome))) {
        // ErrMsg('你輸入港元' + ValueResidence + '。獲提供居所的租值不可超過你入息的' + vm.LimP_rate_VAPRP + '％。')
        MustReset = true
      }
      if (MustReset) {
        ValueResidence = ''
        // dF.T13.focus()
      }
      vm.tax.slfResi = ValueResidence
      if (ValueResidence !== '') {
        vm.slvr = (ValueResidence !== vm.oT13)
        vm.oT13 = ValueResidence
        vm.ChkDD(0)
      }
    },
    T14OnBlur () {
      var vm = this
      var Income, obj, MustReset, ValueResidence
      MustReset = false
      Income = vm.FormatInput(vm.tax.spsIncome, 0, 999999999)
      ValueResidence = vm.FormatInput(vm.tax.spsResi, 0, 999999999)
      if (vm.tax.martial_status === 'S' && ValueResidence !== '0') {
        // ErrMsg('由於你並非已婚人士，因此你不能輸入配偶的獲提供居所的租值。')
        MustReset = true
      } else if (ValueResidence === '*') {
        // ErrMsg('你輸入的數值不正確 !')
        MustReset = true
      } else if (ValueResidence === '+') {
        // ErrMsg('你不可輸入超過 9 位數字的數值 !')
        MustReset = true
      } else if (CDbl(vm.tax.spsResi) > ((vm.LimP_rate_VAPRP / 100) * CDbl(vm.tax.spsIncome))) {
        // ErrMsg('你輸入港元' + ValueResidence + '。獲提供居所的租值不可超過你入息的' + vm.LimP_rate_VAPRP + '％。')
        MustReset = true
      }
      if (MustReset) {
        ValueResidence = ''
        // dF.T14.focus()
      }
      vm.tax.spsResi = ValueResidence
      if (ValueResidence !== '') {
        vm.spvr = (ValueResidence !== vm.oT14)
        vm.oT14 = ValueResidence
        vm.ChkDD(0)
      }
    },
    ChkDD (X) {
      var vm = this
      var MsgID, iv, lv, uv, a, b, v1, vc
      var obj, i
      var slfDDreseted, spsDDreseted
      var spsHasIncome, slfACDChanged, spsACDChanged
      spsHasIncome = (NotNIL(vm.tax.spsIncome))
      MsgID = 0
      slfDDreseted = false
      spsDDreseted = false
      // console.log('ChkDDa', spsHasIncome)
      if (IsNIL(vm.tax.slfIncome) && spsHasIncome) {
        if (NotNIL(vm.tax.slfDona) || NotNIL(vm.tax.slfERCE) || vm.tax.slfElder > 0 || vm.tax.slfDisdep > 0) {
          ClrTxt(vm.tax.slfDona)
          ClrTxt(vm.tax.slfERCE)
          vm.tax.slfElder = 0
          vm.tax.slfDisdep = 0
          MsgID = 2.8
          slfDDreseted = true
        }
        vm.oT3 = ''
        vm.T3tag = '0'
        vm.oT11 = ''
        vm.T11tag = '0'
      }
      if (IsNIL(vm.tax.slfIncome)) {
        if (NotNIL(vm.tax.slfDona) || NotNIL(vm.tax.slfSEE) || NotNIL(vm.tax.slfERCE) || NotNIL(vm.tax.slfMpf) || vm.tax.slfElder > 0 || vm.tax.slfDisdep > 0 || NotNIL(vm.tax.slfOE)) {
          ClrTxt(vm.tax.slfDona)
          ClrTxt(vm.tax.slfSEE)
          ClrTxt(vm.tax.slfERCE)
          vm.tax.slfElder = 0
          vm.tax.slfDisdep = 0
          ClrTxt(vm.tax.slfMpf)
          ClrTxt(vm.tax.slfOE)
          MsgID = 2
          slfDDreseted = true
        }
        vm.oT3 = ''
        vm.T3tag = '0'
        vm.oT11 = ''
        vm.T11tag = '0'
      }
      if (IsNIL(vm.tax.spsIncome)) {
        if (NotNIL(vm.tax.spsDona) || NotNIL(vm.tax.spsSEE) || NotNIL(vm.tax.spsERCE) || NotNIL(vm.tax.spsLoan) || vm.tax.spsElder > 0 || vm.tax.spsDisdep > 0 || NotNIL(vm.tax.spsOE)) {
          ClrTxt(vm.tax.spsDona)
          ClrTxt(vm.tax.spsSEE)
          ClrTxt(vm.tax.spsERCE)
          vm.tax.spsElder = 0
          vm.tax.spsDisdep = 0
          ClrTxt(vm.tax.spsLoan)
          ClrTxt(vm.tax.spsOE)
          if (vm.tax.martial_status === 'S') { // Single ?
            MsgID = 4
          } else {
            MsgID = 2.5
          }
          spsDDreseted = true
        }
        vm.oT4 = ''
        vm.T4tag = '0'
        vm.oT12 = ''
        vm.T12tag = '0'
      }
      vc = (vm.tax.slfDona !== vm.oT3)
      if ((X === 3 && vc) || NotNIL(vm.tax.slfDona)) {
        lv = vm.LimD_DonaLL
        if (IsNIL(vm.tax.slfIncome)) {
          uv = 0
        } else {
          uv = Math.floor(vm.LimD_DonaUL * (CDbl(vm.tax.slfIncome) + CDbl(vm.tax.slfResi) - CDbl(vm.tax.slfOE)) / 100)
        }
        vm.oT3 = ''
        if (vc) vm.T3tag = '0'
        if (NotNIL(vm.tax.slfDona)) {
          iv = vm.FormatInput(vm.tax.slfDona, lv, uv)
          a = vm.FormatInput(vm.tax.slfDona, 0, 99999999999)
          v1 = '0'
          if (iv === '*') {
            MsgID = 1
          } else if (iv === '-') {
            MsgID = 5
            b = a
          } else {
            v1 = a
            if (vc) vm.T3tag = a
            if (iv === '+') {
              if (uv >= lv) {
                v1 = vm.FormatInput(uv, 0, 99999999999)
              } else {
                v1 = '0'
              }
              if (spsHasIncome) {
                MsgID = 6.5
              } else {
                MsgID = 6
              }
              b = a
            }
          }
          if (v1 === '0') {
            vm.oT3 = ''
          } else {
            vm.oT3 = v1
          }
          if (parseFloat(vm.tax.slfDona) < lv) {
            // NOP: wait for input larger
          } else {
            vm.tax.slfDona = SetTxt(vm.tax.slfDona, v1)
          }
          if (vm.T3tag === v1) {
            slfACDChanged = false
          } else {
            slfACDChanged = true
          }
          // 12/2012 reset T3tag to cap of donation allowed
          vm.T3tag = v1
        }
      }
      vc = (vm.tax.spsDona !== vm.oT4)
      if ((X === 4 && vc) || NotNIL(vm.tax.spsDona)) {
        lv = vm.LimD_DonaLL
        if (IsNIL(vm.tax.spsIncome)) {
          uv = 0
        } else {
          uv = Math.floor(vm.LimD_DonaUL * (CDbl(vm.tax.spsIncome) + CDbl(vm.tax.spsResi) - CDbl(vm.tax.spsOE)) / 100)
        }
        vm.oT4 = ''
        if (vc) vm.T4tag = '0'
        if (NotNIL(vm.tax.spsDona)) {
          iv = vm.FormatInput(vm.tax.spsDona, lv, uv)
          a = vm.FormatInput(vm.tax.spsDona, 0, 99999999999)
          v1 = '0'
          if (iv === '*') {
            MsgID = 1
          } else if (iv === '-') {
            MsgID = 5
            b = a
          } else {
            v1 = a
            if (vc) vm.T4tag = a
            if (iv === '+') {
              if (uv >= lv) {
                v1 = vm.FormatInput(uv, 0, 99999999999)
              } else {
                v1 = '0'
              }
              if (spsHasIncome) {
                MsgID = 6.5
              } else {
                MsgID = 6
              }
              b = a
            }
          }
          if (v1 === '0') {
            vm.oT4 = ''
          } else {
            vm.oT4 = v1
          }
          if (parseFloat(vm.tax.spsDona) < lv) {
            // NOP: wait for input larger
          } else {
            vm.tax.spsDona = SetTxt(vm.tax.spsDona, v1)
          }
          if (vm.T4tag === v1) {
            spsACDChanged = false
          } else {
            spsACDChanged = true
          }
          // 12/2012 reset T4tag to cap of donation allowed
          vm.T4tag = v1
        }
      }
      if (NotNIL(vm.tax.slfSEE)) {
        iv = vm.FormatInput(vm.tax.slfSEE, 0, vm.LimD_Education)
        a = vm.FormatInput(vm.tax.slfSEE, 0, 99999999999)
        v1 = '0'
        if (vm.YrEnd < 1997 && iv !== '0') {
          MsgID = 3
          b = 1997
        } else if (iv === '*') {
          MsgID = 1
        } else if (iv === '+') {
          MsgID = 7
          b = a
          v1 = FormatMoney(vm.LimD_Education)
        } else {
          v1 = iv
        }
        console.log('slfSEE', vm.tax.slfSEE, v1, iv, vm.LimD_Education)
        vm.tax.slfSEE = SetTxt(vm.tax.slfSEE, v1)
      }
      if (NotNIL(vm.tax.spsSEE)) {
        iv = vm.FormatInput(vm.tax.spsSEE, 0, vm.LimD_Education)
        a = vm.FormatInput(vm.tax.spsSEE, 0, 99999999999)
        v1 = '0'
        if (vm.YrEnd < 1997 && iv !== '0') {
          MsgID = 3
          b = 1997
        } else if (iv === '*') {
          MsgID = 1
        } else if (iv === '+') {
          MsgID = 7
          b = a
          v1 = FormatMoney(vm.LimD_Education)
        } else {
          v1 = iv
        }
        vm.tax.spsSEE = SetTxt(vm.tax.spsSEE, v1)
      }
      if (NotNIL(vm.tax.slfLoan)) {
        iv = vm.FormatInput(vm.tax.slfLoan, 0, vm.LimD_HomeLoan)
        a = vm.FormatInput(vm.tax.slfLoan, 0, 99999999999)
        v1 = '0'
        if (vm.YrEnd < 1999 && iv !== '0') {
          MsgID = 3
          b = 1999
        } else if (iv === '*') {
          MsgID = 1
        } else if (iv === '+') {
          MsgID = 8
          b = a
          v1 = FormatMoney(vm.LimD_HomeLoan)
        } else {
          v1 = iv
        }
        vm.tax.slfLoan = SetTxt(vm.tax.slfLoan, v1)
      }
      if (NotNIL(vm.tax.spsLoan)) {
        if (vm.tax.martial_status === 'S') { // Single ?
          MsgID = 4
          ClrTxt(vm.tax.spsLoan)
        } else {
          iv = vm.FormatInput(vm.tax.spsLoan, 0, vm.LimD_HomeLoan)
          a = vm.FormatInput(vm.tax.spsLoan, 0, 99999999999)
          v1 = '0'
          if (vm.YrEnd < 1999 && iv !== '0') {
            MsgID = 3
            b = 1999
          } else if (iv === '*') {
            MsgID = 1
          } else if (iv === '+') {
            MsgID = 8
            b = a
            v1 = FormatMoney(vm.LimD_HomeLoan)
          } else {
            v1 = iv
          }
          vm.tax.spsLoan = SetTxt(vm.tax.spsLoan, v1)
        }
      }
      if (NotNIL(vm.tax.slfERCE)) {
        iv = vm.FormatInput(vm.tax.slfERCE, 0, vm.LimD_Elderly * vm.tax.slfElder)
        a = vm.FormatInput(vm.tax.slfERCE, 0, 99999999999)
        v1 = '0'
        if (vm.YrEnd < 1999 && iv !== '0') {
          MsgID = 3
          b = 1999
        } else if (iv === '*') {
          MsgID = 1
        } else if (iv === '+') {
          MsgID = 9
          b = a
          v1 = FormatMoney(vm.LimD_Elderly * vm.tax.slfElder)
        } else {
          v1 = iv
        }
        vm.tax.slfERCE = SetTxt(vm.tax.slfERCE, v1)
      }
      if (NotNIL(vm.tax.spsERCE)) {
        iv = vm.FormatInput(vm.tax.spsERCE, 0, vm.LimD_Elderly * vm.tax.spsElder)
        a = vm.FormatInput(vm.tax.spsERCE, 0, 99999999999)
        v1 = '0'
        if (vm.YrEnd < 1999 && iv !== '0') {
          MsgID = 3
          b = 1999
        } else if (iv === '*') {
          MsgID = 1
        } else if (iv === '+') {
          MsgID = 9
          b = a
          v1 = FormatMoney(vm.LimD_Elderly * vm.tax.spsElder)
        } else {
          v1 = iv
        }
        vm.tax.spsERCE = SetTxt(vm.tax.spsERCE, v1)
      }
      vc = (vm.tax.slfMpf !== vm.oT11)
      if ((X === 11 && vc) || NotNIL(vm.tax.slfMpf)) {
        if (IsNIL(vm.tax.slfIncome)) {
          uv = 0
        } else {
          uv = vm.LimD_MPF
        }
        vm.oT11 = ''
        if (vc) vm.T11tag = '0'
        if (NotNIL(vm.tax.slfMpf)) {
          iv = vm.FormatInput(vm.tax.slfMpf, 0, uv)
          a = vm.FormatInput(vm.tax.slfMpf, 0, 99999999999)
          v1 = '0'
          if (vm.YrEnd < 2001 && iv !== '0') {
            MsgID = 3
            b = 2001
          } else if (iv === '*') {
            MsgID = 1
          } else {
            v1 = a
            if (vc) vm.T11tag = a
            if (iv === '+') {
              v1 = vm.FormatInput(uv, 0, 99999999999)
              MsgID = 10
              b = a
            }
          }
          if (v1 === '0') {
            vm.oT11 = ''
          } else {
            vm.oT11 = v1
          }
          console.log('slfMpf', vm.tax.slfMpf, v1, uv)
          vm.tax.slfMpf = SetTxt(vm.tax.slfMpf, v1)
        }
      }
      vc = (vm.tax.spsMpf !== vm.oT12)
      if ((X === 12 && vc) || NotNIL(vm.tax.spsMpf)) {
        if (IsNIL(vm.tax.spsIncome)) {
          uv = 0
        } else {
          uv = Math.floor(vm.LimD_rate_MPF * CDbl(vm.tax.spsIncome) / 100) // limit by percentage of income
          uv = vm.LimD_MPF
        }
        vm.oT12 = ''
        if (vc) vm.T12tag = '0'
        if (NotNIL(vm.tax.spsMpf)) {
          iv = vm.FormatInput(vm.tax.spsMpf, 0, uv)
          a = vm.FormatInput(vm.tax.spsMpf, 0, 99999999999)
          v1 = '0'
          if (vm.YrEnd < 2001 && iv !== '0') {
            MsgID = 3
            b = 2001
          } else if (iv === '*') {
            MsgID = 1
          } else {
            v1 = a
            if (vc) vm.T12tag = a
            if (iv === '+') {
              v1 = vm.FormatInput(uv, 0, 99999999999)
              MsgID = 10
              b = a
            }
          }
          if (v1 === '0') {
            vm.oT12 = ''
          } else {
            vm.oT12 = v1
          }
          // console.log('spsMpf', vm.tax.spsMpf, v1, iv, uv)
          vm.tax.spsMpf = SetTxt(vm.tax.spsMpf, v1)
        }
      }
      if (NotNIL(vm.tax.slfOE)) {
        if (IsNIL(vm.tax.slfIncome)) {
          iv = 0
        } else {
          iv = vm.FormatInput(vm.tax.slfOE, 0, 999999999)
        }
        if (iv === '*') {
          MsgID = 1
          v1 = 0
        } else if (iv === '+') {
          MsgID = 1.5
          v1 = 0
        } else {
          v1 = iv
        }
        // console.log('slfOE', vm.tax.slfOE, v1, iv)
        vm.tax.slfOE = SetTxt(vm.tax.slfOE, v1)
      }
      // console.log('spsOE', vm.tax.spsIncome, vm.tax.spsOE, v1, iv)
      if (NotNIL(vm.tax.spsOE)) {
        if (IsNIL(vm.tax.spsIncome)) {
          iv = 0
        } else {
          iv = vm.FormatInput(vm.tax.spsOE, 0, 999999999)
        }
        if (iv === '*') {
          MsgID = 1
          v1 = 0
        } else if (iv === '+') {
          MsgID = 1.5
          v1 = 0
        } else {
          v1 = iv
        }
        // console.log('spsOE', vm.tax.spsOE, v1, iv)
        vm.tax.spsOE = SetTxt(vm.tax.spsOE, v1)
      }
      if (X > 0) {
        if (MsgID === 1) a = 0// ErrMsg('你輸入的數值不正確 !')
        else if (MsgID === 1.5) a = 0// ErrMsg('你不可輸入超過 9 位數字的數值 !')
        else if (MsgID === 2) a = 0// ErrMsg('由於你沒有入息，因此你不能申請扣除。')
        else if (MsgID === 2.5) a = 0// ErrMsg('由於你配偶沒有入息，因此你配偶不能申請扣除。')
        else if (MsgID === 2.8) a = 0// ErrMsg('由於你沒有入息，因此你不能申請扣除，你可把有關數額於配偶一方內輸入。')
        else if (MsgID === 3) a = 0// ErrMsg('這項扣除由' + (b - 1) + '/' + rightStr(b, 2) + '課稅年度起開始生效。')
        else if (MsgID === 4) a = 0// ErrMsg('由於你並非已婚人士，因此你不能輸入配偶的扣除。')
        else if (MsgID === 5) a = 0// ErrMsg('你輸入港元' + b + '。 認可慈善捐款須達一百元或以上方可申請扣除。')
        else if (MsgID === 6) a = 0 // InfoMsg('你輸入港元' + b + '。 認可慈善捐款扣除額不可超出你入息的' + CInt(LimD_DonaUL) + ' %。')
        else if (MsgID === 6.5) a = 0 // InfoMsg('你輸入港元' + b + '。 認可慈善捐款扣除額不可超出你入息的' + CInt(LimD_DonaUL) + ' %，你可把餘下的慈善捐款數額於配偶一方內輸入。')
        else if (MsgID === 7) a = 0// ErrMsg('你輸入港元' + b + '。 個人進修開支最高扣除額為港元' + FormatMoney(LimD_Education) + '。')
        else if (MsgID === 8) a = 0// ErrMsg('你輸入港元' + b + '。 居所貸款利息最高扣除額為港元' + FormatMoney(LimD_HomeLoan) + '。')
        else if (MsgID === 9) a = 0// ErrMsg('你輸入港元' + b + '。 長者住宿照顧開支扣除額不可超過在安老院居住的受養人數目 x 每位受養人最高扣除額港元' + FormatMoney(LimD_Elderly) + '。')
        else if (MsgID === 10) a = 0 // InfoMsg('你輸入港元' + b + '。 認可退休計劃的強制性供款最高扣除額為港元' + FormatMoney(LimD_MPF) + '。')
        if (X === 3) NullZero(vm.tax.slfDona, MsgID)
        else if (X === 4) NullZero(vm.tax.spsDona, MsgID)
        else if (X === 5) NullZero(vm.tax.slfSEE, MsgID)
        else if (X === 6) NullZero(vm.tax.spsSEE, MsgID)
        else if (X === 7) NullZero(vm.tax.slfLoan, MsgID)
        else if (X === 8) NullZero(vm.tax.spsLoan, MsgID)
        else if (X === 9) NullZero(vm.tax.slfERCE, MsgID)
        else if (X === 10) NullZero(vm.tax.spsERCE, MsgID)
        else if (X === 11) NullZero(vm.tax.slfMpf, MsgID)
        else if (X === 12) NullZero(vm.tax.spsMpf, MsgID)
        else if (X === 15) NullZero(vm.tax.slfOE, MsgID)
        else if (X === 16) NullZero(vm.tax.spsOE, MsgID)
      } else { // ChkDD triggered by fields other than Deduction Inputs (such as Income or Assessment year)
        if (vm.slic || vm.slvr) {
          if (vm.slic && (CInt(vm.T3tag) > 0)) {
            slfACDChanged = true
          }
          vm.slic = false
          vm.slvr = false
          vc = false
          v1 = vm.tax.slfDona
          if (v1 === '') v1 = '0'
          if (slfACDChanged) vc = true
          v1 = vm.tax.slfMpf
          if (v1 === '') v1 = '0'
          if (v1 !== vm.T11tag) vc = true
          if (slfDDreseted) vc = true
          if (vc) {
            a = 0 // InfoMsg('由於總入息有改變，可減免扣除的最高限額也相應改變。請考慮重新輸入。')
          }
        }
        if (vm.spic || vm.spvr) {
          if (vm.spic && (CInt(vm.T4tag) > 0)) {
            spsACDChanged = true
          }
          vm.spic = false
          vm.spvr = false
          vc = false
          v1 = vm.tax.spsDona
          if (v1 === '') v1 = '0'
          if (spsACDChanged) vc = true
          v1 = vm.tax.spsLoan
          if (v1 === '') v1 = '0'
          if (v1 !== vm.T12tag) vc = true
          if (spsDDreseted) vc = true
          if (vc) {
            a = 0 // InfoMsg('由於總入息有改變，可減免扣除的最高限額也相應改變。請考慮重新輸入。')
          }
        }
        if (X === -1 && MsgID !== 0) {
          a = 0 // InfoMsg('因為課稅年度有改變，可減免扣除的最高限額也相應改變。請考慮重新輸入。')
        }
      }
    }, // End ChkDD
    D1OnChange () {
      var vm = this
      var YrValue = '2018-2019'
      // YrValue = dF.D1.options[dF.D1.selectedIndex].value
      vm.YrEnd = parseInt(rightStr(YrValue, 4), 10)
      if (vm.YrEnd < 1995) { // before 94/95
      }
      if (vm.YrEnd < 1996) { // before 95/96
        vm.tax.CAbb_DIS = 0
        vm.tax.resi_parent_DIS = 0
        vm.tax.non_resi_parent_DIS = 0
        vm.tax.spouse_disabled_dependent_DIS = false // '' + 0
      }
      if (vm.YrEnd < 1997) { // before 96/97
        vm.tax.brosis_dep = 0
        vm.tax.brosis_dep_DIS = 0
      }
      if (vm.YrEnd < 1999) { // before 98/99
        vm.tax.slfElder = 0
        vm.tax.spsElder = 0
        vm.tax.slfDisdep = 0
        vm.tax.spsDisdep = 0
      }
      if (vm.YrEnd < 2006) { // before 2005/06
        vm.tax.resi_parent = 0
        vm.tax.non_resi_parent = 0
      }
      this.get_deduction()
      vm.ChkDD(-1)
    },
    D2OnClick () {
      var vm = this
      if (vm.tax.martial_status === 'S') { // Single ?
        vm.tax.spsIncome = '0'
        vm.tax.spsResi = '0'
        vm.tax.spouse_disabled_dependent_DIS = false // '' + 0
      }
      if (vm.tax.martial_status === 'M') { // Married ?
        vm.tax.single_parent = false // '' + 0
      }
      vm.ChkDD(0)
    },
    CheckYear (Yr) {
      var vm = this
      if (Yr > parseInt(vm.AssessYear.split('-')[0], 10)) {
        // ErrMsg('這項免稅額由' + (Yr - 1) + '/' + rightStr(Yr, 2) + '課稅年度起開始生效。')
        return false
      } else {
        return true
      }
    },
    init () {
      var vm = this
      vm.get_deduction()
    },
    main1 () {
      if (this.CLAWBACK) {
        this.AASing = this.AAL_SING - (this.netSelfI - this.AL_SING - this.AAL_SING) * this.CLAW_RATE / 100
        if (this.AASing < 0) this.AASing = 0
        this.AAMarr = this.AAL_MARR - (this.netSelfI + this.netSpouseI - this.AL_MARR - this.AAL_MARR) * this.CLAW_RATE / 100
        if (this.AAMarr < 0) this.AAMarr = 0
      } else { // CLAWBACK === false
        this.AASing = this.AAL_SING
        this.AAMarr = this.AAL_MARR
      }
    },
    reset_form () {
      this.sh_result = false
      this.$parent.reset_form1()
    },
    STCOut2_func () {
      var vm = this
      var tmp = 0
      var i = 0
      var self_DISABLE_deduct
      var sps_DISABLE_deduct
      this.STCIn8 = false // 1: 有供養傷殘, 0: 沒有供養傷殘

      // INIT
      var STCOut2018 = new Array(80)
      for (i = 0; i < 80; i++) {
        STCOut2018[i] = this.STCOut1[i]
      }

      // 入息
      vm.tax.slfNCI = parseFloat(vm.tax.slfIncome)
      vm.tax.spsNCI = parseFloat(vm.tax.spsIncome)
      if (vm.tax.slfNCI > 0) {
        STCOut2018[0] = parseFloat(vm.tax.slfNCI) + parseFloat(vm.tax.slfResi)
      } else {
        STCOut2018[0] = parseFloat(vm.tax.slfNCI)
        // vm.tax.slfResi = 0
        // vm.tax.slfSEE = 0
        // vm.tax.slfOE = 0
        // vm.tax.slfDona = 0
        // vm.tax.slfERCE = 0
        // vm.tax.slfMpf = 0
        // vm.tax.slfLoan = 0
        // ErrMsg('由於你沒有入息，因此你不能扣除居所貸款利息。')
      }
      if (vm.tax.spsNCI > 0) {
        STCOut2018[1] = parseFloat(vm.tax.spsNCI) + parseFloat(vm.tax.spsResi)
      } else {
        STCOut2018[1] = parseFloat(vm.tax.spsNCI)
        // vm.tax.spsResi = 0
        // vm.tax.spsSEE = 0
        // vm.tax.spsOE = 0
        // vm.tax.spsDona = 0
        // vm.tax.spsERCE = 0
        // vm.tax.spsMpf = 0
        // vm.tax.spsLoan = 0
        // ErrMsg('由於你們沒有入息，因此你們不能扣除居所貸款利息。')
      }
      this.STCIn2 = parseFloat(vm.tax.slfIncome) + parseFloat(vm.tax.slfResi)
      this.STCIn3 = parseFloat(vm.tax.spsIncome) + parseFloat(vm.tax.spsResi)

      // 子女兄弟姊妹祖父母 扣稅 parameter
      this.STCIn4 = (parseFloat(vm.tax.CAbb) < 10) ? parseFloat(vm.tax.CAbb) : 0
      this.STCIn5 = isNaN(parseFloat(vm.tax.brosis_dep)) ? 0 : parseFloat(vm.tax.brosis_dep)
      this.STCIn6 = isNaN(parseFloat(vm.tax.resi_parent)) ? 0 : parseFloat(vm.tax.resi_parent)
      this.STCIn7 = isNaN(parseFloat(vm.tax.non_resi_parent)) ? 0 : parseFloat(vm.tax.non_resi_parent)
      this.STCIn9 = (vm.tax.spouse_disabled_dependent_DIS === true)
      this.STCIn10 = isNaN(parseFloat(vm.tax.NBbb_DIS)) ? 0 : parseFloat(vm.tax.NBbb_DIS)
      this.STCIn11 = isNaN(parseFloat(vm.tax.brosis_dep_DIS)) ? 0 : parseFloat(vm.tax.brosis_dep_DIS)
      this.STCIn12 = isNaN(parseFloat(vm.tax.resi_parent_DIS)) ? 0 : parseFloat(vm.tax.resi_parent_DIS)
      this.STCIn13 = isNaN(parseFloat(vm.tax.non_resi_parent_DIS)) ? 0 : parseFloat(vm.tax.non_resi_parent_DIS)
      vm.tax.slfOE = isNaN(parseFloat(vm.tax.slfOE)) ? 0 : parseFloat(vm.tax.slfOE)
      vm.tax.spsOE = isNaN(parseFloat(vm.tax.spsOE)) ? 0 : parseFloat(vm.tax.spsOE)
      // if (vm.tax.slfOE > this.STCIn2) {
      //   vm.tax.slfOE = this.STCIn2
      // }
      // if (vm.tax.spsOE > this.STCIn3) {
      //   vm.tax.spsOE = this.STCIn3
      // }
      vm.tax.slfSEE = isNaN(parseFloat(vm.tax.slfSEE)) ? 0 : parseFloat(vm.tax.slfSEE)
      // if (vm.tax.slfSEE > (this.STCIn2 - vm.tax.slfOE)) {
      //   vm.tax.slfSEE = this.STCIn2 - vm.tax.slfOE
      // }
      vm.tax.spsSEE = isNaN(parseFloat(vm.tax.spsSEE)) ? 0 : parseFloat(vm.tax.spsSEE)
      // if (vm.tax.spsSEE > (this.STCIn3 - vm.tax.spsOE)) {
      //   vm.tax.spsSEE = this.STCIn3 - vm.tax.spsOE
      // }

      if (vm.tax.slfOE + vm.tax.slfSEE > this.STCIn2) {
        vm.tax.slfOE = this.STCIn2 - vm.tax.slfSEE
      }
      if (vm.tax.spsOE + vm.tax.spsSEE > this.STCIn3) {
        vm.tax.spsOE = this.STCIn3 - vm.tax.spsSEE
      }
      vm.tax.slfDona = parseFloat(vm.tax.slfDona)
      vm.tax.spsDona = parseFloat(vm.tax.spsDona)

      // 扣稅總額
      this.STCIn14 = parseFloat(vm.tax.slfDona) + parseFloat(vm.tax.slfERCE) + parseFloat(vm.tax.slfMpf) + parseFloat(vm.tax.slfSEE) + parseFloat(vm.tax.slfOE)
      this.STCIn15 = parseFloat(vm.tax.spsDona) + parseFloat(vm.tax.spsERCE) + parseFloat(vm.tax.spsMpf) + parseFloat(vm.tax.spsSEE) + parseFloat(vm.tax.spsOE)

      // 扣稅總額 onday_onday(5)
      this.STCIn14 = this.STCIn14 + parseFloat(vm.tax.slfMedInsu)
      this.STCIn15 = this.STCIn15 + parseFloat(vm.tax.spsMedInsu)

      // TO-WORK!!! T3tag T4tag has maximum donation
      this.STCIn16 = parseFloat(vm.tax.slfDona) + parseFloat(vm.tax.spsDona) // STCIn16 = CDbl(vm.T3tag) + CDbl(vm.T4tag)
      this.jntOE = parseFloat(vm.tax.slfOE) + parseFloat(vm.tax.spsOE)
      this.jntSEE = parseFloat(vm.tax.slfSEE) + parseFloat(vm.tax.spsSEE)
      this.STCIn16 = this.STCIn16 + parseFloat(vm.tax.slfERCE) + parseFloat(vm.tax.slfMpf) + parseFloat(vm.tax.spsERCE) + parseFloat(vm.tax.spsMpf) + parseFloat(vm.jntOE) + parseFloat(vm.jntSEE)
      if (this.STCIn2 > 0) {
        this.STCIn14 = this.STCIn14 + parseFloat(vm.tax.slfLoan)
      }
      if (this.STCIn3 > 0) {
        this.STCIn15 = this.STCIn15 + parseFloat(vm.tax.spsLoan)
      }
      if (this.STCIn2 > 0 || this.STCIn3 > 0) {
        this.STCIn16 = this.STCIn16 + parseFloat(vm.tax.slfLoan) + parseFloat(vm.tax.spsLoan)
      }
      this.STCIn16 = this.STCIn16 + parseFloat(vm.tax.slfMedInsu) + parseFloat(vm.tax.spsMedInsu)

      this.STCIn17 = parseInt(vm.tax.resi_parent_5560, 10)
      this.STCIn18 = parseInt(vm.tax.non_resi_parent_5560, 10)
      this.STCIn19 = (parseFloat(vm.tax.slfERCE) > 0) ? parseFloat(vm.tax.slfDisdep) : 0
      this.STCIn20 = (parseFloat(vm.tax.spsERCE) > 0) ? parseFloat(vm.tax.spsDisdep) : 0
      this.STCIn21 = parseInt(vm.tax.NBbb, 10)
      this.STCIn22 = parseInt(vm.tax.CAbb_DIS, 10)
      this.STCIn23 = (vm.tax.single_parent === true)
      this.ChkDD(0)

      // 基本免稅額
      STCOut2018[3] = this.AL_SING + this.AASing
      STCOut2018[4] = this.AL_MARR + this.AAMarr
      STCOut2018[5] = this.SPA
      STCOut2018[18] = this.CA[this.STCIn4]
      STCOut2018[19] = this.DBSA * this.STCIn5
      STCOut2018[21] = (this.DPA + this.ADPA) * this.STCIn6
      STCOut2018[22] = this.DPA * this.STCIn7
      STCOut2018[20] = STCOut2018[21] + STCOut2018[22]
      STCOut2018[34] = false // 以標準稅率計算
      STCOut2018[57] = this.STCIn14
      STCOut2018[58] = this.STCIn15
      STCOut2018[59] = this.STCIn16
      STCOut2018[75] = this.CA[this.STCIn21] + this.NBCA[this.STCIn21]
      STCOut2018[78] = this.slfERCE
      STCOut2018[79] = this.spsERCE
      self_DISABLE_deduct = (vm.tax.self_disabled_DIS === true && this.STCIn2 > 0) ? 75000 : 0 // onday_onday(new)
      sps_DISABLE_deduct = (vm.tax.sps_disabled_DIS === true && vm.tax.martial_status === 'M' && this.STCIn3 > 0) ? 75000 : 0 // onday_onday(new)
      // console.log('self_DISABLE_deduct', self_DISABLE_deduct, vm.tax.self_disabled_DIS)
      // 供養父母的數目
      this.ADPNo = this.STCIn6
      this.DPNo = this.STCIn6 + this.STCIn7
      this.SADPNo = this.STCIn17
      this.SDPNo = this.STCIn17 + this.STCIn18
      this.STCIn8 = (this.STCIn9 || this.STCIn10 + this.STCIn11 + this.STCIn12 + this.STCIn13 + this.STCIn22 > 0)
      // console.log('STCIn8: ', this.STCIn9, this.STCIn10, this.STCIn11, this.STCIn12, this.STCIn13, this.STCIn22)

      this.netSelfI = this.STCIn2 - this.STCIn14
      if (this.netSelfI < 0) {
        this.netSelfI = 0
      }
      this.netSpouseI = this.STCIn3 - this.STCIn15
      if (this.netSpouseI < 0) {
        this.netSpouseI = 0
      }
      this.netJointI = this.STCIn2 + this.STCIn3 - this.STCIn16
      // console.log('JJJoin01 ', this.STCIn2, this.STCIn3, this.STCIn16)
      if (this.netJointI < 0) {
        this.netJointI = 0
      }
      STCOut2018[2] = this.STCIn2 + this.STCIn3

      // 標準稅 計算
      this.slfStdTP = this.netSelfI * this.STD_RATE / 100 // self TP at standard rate
      this.spsStdTP = this.netSpouseI * this.STD_RATE / 100 // spouse TP at standard rate
      this.jointStdTP = this.netJointI * this.STD_RATE / 100 // joint TP at standard rate
      // console.log('spsStdTP: ', this.spsStdTP, this.netSpouseI)

      // 分 case
      if (vm.tax.martial_status === 'S') { // 或只單一人有收入
        STCOut2018[3] = this.AL_SING + this.AASing
        STCOut2018[4] = this.AL_MARR + this.AAMarr
        STCOut2018[5] = tmp
        this.spsDDA = false
        if ((this.STCIn4 + this.STCIn21 > 0) && (this.STCIn23 === true)) {
          STCOut2018[5] = this.SPA
        } else { // STCIn4+STCIn21 === 0
          STCOut2018[5] = 0
        }
        STCOut2018[6] = this.CA[this.STCIn4]
        STCOut2018[7] = this.DBSA * this.STCIn5
        STCOut2018[9] = (this.DPA + this.ADPA) * this.STCIn6
        STCOut2018[10] = this.DPA * this.STCIn7
        STCOut2018[8] = STCOut2018[9] + STCOut2018[10]
        STCOut2018[12] = this.CA[this.STCIn4]
        STCOut2018[13] = this.DBSA * this.STCIn5
        STCOut2018[15] = (this.DPA + this.ADPA) * this.STCIn6
        STCOut2018[16] = this.DPA * this.STCIn7
        STCOut2018[14] = STCOut2018[15] + STCOut2018[16]

        STCOut2018[34] = this.StdFlag
        STCOut2018[32] = STCOut2018[30]
        STCOut2018[37] = this.STCIn4
        STCOut2018[38] = this.STCIn5
        STCOut2018[39] = this.STCIn6
        STCOut2018[40] = this.STCIn7
        STCOut2018[41] = this.STCIn4
        STCOut2018[42] = this.STCIn5
        STCOut2018[43] = this.STCIn6
        STCOut2018[44] = this.STCIn7

        STCOut2018[61] = (this.SDPGPA + this.SADPGPA) * this.STCIn17
        STCOut2018[62] = this.SDPGPA * this.STCIn18
        STCOut2018[60] = STCOut2018[61] + STCOut2018[62]
        STCOut2018[64] = (this.SDPGPA + this.SADPGPA) * this.STCIn17
        STCOut2018[65] = this.SDPGPA * this.STCIn18
        STCOut2018[63] = STCOut2018[64] + STCOut2018[65]
        STCOut2018[69] = this.STCIn17
        STCOut2018[70] = this.STCIn18
        STCOut2018[71] = this.STCIn17
        STCOut2018[72] = this.STCIn18
        STCOut2018[73] = this.CA[this.STCIn21] + this.NBCA[this.STCIn21]
        STCOut2018[74] = this.CA[this.STCIn21] + this.NBCA[this.STCIn21]
        STCOut2018[76] = this.STCIn21
        STCOut2018[77] = this.STCIn21
        STCOut2018[78] = this.slfERCE

        if (this.STCIn8) {
          STCOut2018[11] = this.DIS_DA * (this.STCIn10 + this.STCIn11 + this.STCIn12 + this.STCIn13 + this.STCIn19 + this.STCIn22)

          STCOut2018[45] = this.STCIn10 + this.STCIn22
          STCOut2018[46] = this.STCIn11
          STCOut2018[47] = this.STCIn12
          STCOut2018[48] = this.STCIn13
          STCOut2018[49] = STCOut2018[45] + STCOut2018[46] + STCOut2018[47] + STCOut2018[48] + this.STCIn19
        } else {
          STCOut2018[11] = this.DIS_DA * this.STCIn19

          STCOut2018[49] = this.STCIn19
        }

        // SUM
        STCOut2018[24] = STCOut2018[3] + STCOut2018[5] + STCOut2018[6] + STCOut2018[7] + STCOut2018[8] + STCOut2018[60] + STCOut2018[11] + STCOut2018[73]
        STCOut2018[24] = STCOut2018[24] + self_DISABLE_deduct
        STCOut2018[27] = this.netSelfI - STCOut2018[24]
        this.STCMainRV = 10
      } else { // === 'M'
        // 需要分case本人收入===0 (22) 或 配偶收入===0 (24)
        // 有得過俾配偶，計nMin, child_count
        if (this.STCIn3 === 0) { // taxtype === 22
          STCOut2018[0] = this.STCIn2
          STCOut2018[4] = this.AL_MARR + this.AAMarr
          STCOut2018[6] = this.CA[this.STCIn4]
          STCOut2018[7] = this.DBSA * this.STCIn5
          STCOut2018[9] = (this.DPA + this.ADPA) * this.STCIn6
          STCOut2018[10] = this.DPA * this.STCIn7
          STCOut2018[8] = STCOut2018[9] + STCOut2018[10]
          STCOut2018[61] = (this.SDPGPA + this.SADPGPA) * this.STCIn17
          STCOut2018[62] = this.SDPGPA * this.STCIn18
          STCOut2018[60] = STCOut2018[61] + STCOut2018[62]
          STCOut2018[73] = this.CA[this.STCIn21] + this.NBCA[this.STCIn21]
          this.slfNCI = 0
          this.slfNCI = this.netSelfI - (STCOut2018[4] + STCOut2018[6] + STCOut2018[7] + STCOut2018[8] + STCOut2018[60] + STCOut2018[73])

          if (this.STCIn8 === true) {
            if ((this.STCIn9 === true) && ((STCOut2018[0] - this.AL_SING - STCOut2018[57]) > 0)) {
              STCOut2018[11] = this.DIS_DA * (1 + this.STCIn10 + this.STCIn11 + this.STCIn12 + this.STCIn13 + this.STCIn19 + this.STCIn22)
              STCOut2018[55] = true
            } else {
              STCOut2018[11] = this.DIS_DA * (this.STCIn10 + this.STCIn11 + this.STCIn12 + this.STCIn13 + this.STCIn19 + this.STCIn22)
            }
          } else { // STCIn8 === false
            STCOut2018[11] = this.DIS_DA * this.STCIn19
          }
          STCOut2018[24] = STCOut2018[4] + STCOut2018[6] + STCOut2018[7] + STCOut2018[8] + STCOut2018[60] + STCOut2018[11] + STCOut2018[73]
          STCOut2018[24] = STCOut2018[24] + self_DISABLE_deduct + sps_DISABLE_deduct
          STCOut2018[27] = this.netSelfI - STCOut2018[24]
          if (STCOut2018[27] < 0) {
            STCOut2018[27] = 0
          }
          STCOut2018[30] = Math.floor(this.CompTP(this.slfStdTP, STCOut2018[27]))
          STCOut2018[34] = this.StdFlag
          STCOut2018[32] = STCOut2018[30]
          STCOut2018[37] = this.STCIn4
          STCOut2018[38] = this.STCIn5
          STCOut2018[39] = this.STCIn6
          STCOut2018[40] = this.STCIn7
          STCOut2018[69] = this.STCIn17
          STCOut2018[70] = this.STCIn18
          STCOut2018[76] = this.STCIn21
          if (this.STCIn8 === true) {
            STCOut2018[45] = this.STCIn10 + this.STCIn22
            STCOut2018[46] = this.STCIn11
            STCOut2018[47] = this.STCIn12
            STCOut2018[48] = this.STCIn13
            STCOut2018[49] = STCOut2018[45] + STCOut2018[46] + STCOut2018[47] + STCOut2018[48] + this.STCIn19
          } else {
            STCOut2018[49] = this.STCIn19
          }
          this.STCMainRV = 22
        } else if (this.STCIn2 === 0) { // taxtype === 24
          STCOut2018[1] = this.STCIn3
          STCOut2018[4] = this.AL_MARR + this.AAMarr
          STCOut2018[12] = this.CA[this.STCIn4]
          STCOut2018[13] = this.DBSA * this.STCIn5
          STCOut2018[15] = (this.DPA + this.ADPA) * this.STCIn6
          STCOut2018[16] = this.DPA * this.STCIn7
          STCOut2018[14] = STCOut2018[15] + STCOut2018[16]
          STCOut2018[64] = (this.SDPGPA + this.SADPGPA) * this.STCIn17
          STCOut2018[65] = this.SDPGPA * this.STCIn18
          STCOut2018[63] = STCOut2018[64] + STCOut2018[65]
          STCOut2018[74] = this.CA[this.STCIn21] + this.NBCA[this.STCIn21]
          if (this.STCIn8 === true) {
            STCOut2018[17] = this.DIS_DA * (this.STCIn10 + this.STCIn11 + this.STCIn12 + this.STCIn13 + this.STCIn20 + this.STCIn22)
          } else {
            STCOut2018[17] = this.DIS_DA * this.STCIn20
          }
          STCOut2018[25] = STCOut2018[4] + STCOut2018[12] + STCOut2018[13] + STCOut2018[14] + STCOut2018[63] + STCOut2018[17] + STCOut2018[74]
          STCOut2018[28] = this.netSpouseI - STCOut2018[25]
          if (STCOut2018[28] < 0) {
            STCOut2018[28] = 0
          }
          // console.log(this.netSpouseI, STCOut2018[25])
          // console.log(this.spsStdTP, STCOut2018[28], this.CompTP(this.spsStdTP, STCOut2018[28]))
          // console.log('===========')
          STCOut2018[31] = Math.floor(this.CompTP(this.spsStdTP, STCOut2018[28]))
          STCOut2018[35] = this.StdFlag
          STCOut2018[32] = STCOut2018[31]
          STCOut2018[41] = this.STCIn4
          STCOut2018[42] = this.STCIn5
          STCOut2018[43] = this.STCIn6
          STCOut2018[44] = this.STCIn7
          STCOut2018[71] = this.STCIn17
          STCOut2018[72] = this.STCIn18
          STCOut2018[77] = this.STCIn21
          if (this.STCIn8 === true) {
            STCOut2018[50] = this.STCIn10 + this.STCIn22
            STCOut2018[51] = this.STCIn11
            STCOut2018[52] = this.STCIn12
            STCOut2018[53] = this.STCIn13
            STCOut2018[54] = STCOut2018[50] + STCOut2018[51] + STCOut2018[52] + STCOut2018[53] + this.STCIn20
          } else {
            STCOut2018[54] = this.STCIn20
          }
          this.STCMainRV = 24
        } else { // taxtype === 30, 40, 42, 45
          STCOut2018[3] = this.AL_SING + this.AASing
          STCOut2018[4] = this.AL_MARR + this.AAMarr
          STCOut2018[5] = tmp
          STCOut2018[6] = this.CA[this.nMin * this.STCIn4]
          STCOut2018[7] = this.DBSA * this.oMin
          STCOut2018[9] = (this.DPA + this.ADPA) * this.mMin
          STCOut2018[10] = this.DPA * this.lMin
          STCOut2018[8] = STCOut2018[9] + STCOut2018[10]
          STCOut2018[11] = this.DIS_DA * (this.nMin * (this.STCIn10 + this.STCIn22) + this.odMin + this.ldMin + this.mdMin + this.STCIn19)
          STCOut2018[12] = this.CA[(1 - this.nMin) * this.STCIn4]
          STCOut2018[13] = this.DBSA * (this.STCIn5 - this.oMin)
          STCOut2018[15] = (this.DPA + this.ADPA) * (this.STCIn6 - this.mMin)
          STCOut2018[16] = this.DPA * (this.STCIn7 - this.lMin)
          STCOut2018[14] = STCOut2018[15] + STCOut2018[16]
          STCOut2018[37] = this.nMin * this.STCIn4
          STCOut2018[38] = this.oMin
          STCOut2018[39] = this.mMin
          STCOut2018[40] = this.lMin
          STCOut2018[41] = (1 - this.nMin) * this.STCIn4
          STCOut2018[42] = this.STCIn5 - this.oMin
          STCOut2018[43] = this.STCIn6 - this.mMin
          STCOut2018[44] = this.STCIn7 - this.lMin

          STCOut2018[61] = (this.SDPGPA + this.SADPGPA) * this.qMin
          STCOut2018[62] = this.SDPGPA * this.pMin
          STCOut2018[60] = STCOut2018[61] + STCOut2018[62]
          STCOut2018[64] = (this.SDPGPA + this.SADPGPA) * (this.STCIn17 - this.qMin)
          STCOut2018[65] = this.SDPGPA * (this.STCIn18 - this.pMin)
          STCOut2018[63] = STCOut2018[64] + STCOut2018[65]
          STCOut2018[67] = (this.SDPGPA + this.SADPGPA) * this.STCIn17
          STCOut2018[68] = this.SDPGPA * this.STCIn18
          STCOut2018[66] = STCOut2018[67] + STCOut2018[68]
          STCOut2018[69] = this.qMin
          STCOut2018[70] = this.pMin
          STCOut2018[71] = this.STCIn17 - this.qMin
          STCOut2018[72] = this.STCIn18 - this.pMin
          STCOut2018[73] = this.CA[this.nMin * this.STCIn21] + this.NBCA[this.nMin * this.STCIn21]
          STCOut2018[74] = this.CA[(1 - this.nMin) * this.STCIn21] + this.NBCA[(1 - this.nMin) * this.STCIn21]
          STCOut2018[76] = this.nMin * this.STCIn21
          STCOut2018[77] = (1 - this.nMin) * this.STCIn21

          this.cal_join_min()

          // // // // // // // // // //
          // SUM
          this.jntNCIDDAsps = this.netJointI - (this.AL_MARR + this.AAMarr) - this.CA[this.STCIn4] - this.DBSA * this.STCIn5 - (this.DPA * this.DPNo + this.ADPA * this.ADPNo) - this.DIS_DA * (1 + this.STCIn10 + this.STCIn11 + this.STCIn12 + this.STCIn13 + this.STCIn22) -
          (this.SDPGPA * this.SDPNo + this.SADPGPA * this.SADPNo) - this.DIS_DA * (this.STCIn19 + this.STCIn20) - (this.CA[this.STCIn21] + this.NBCA[this.STCIn21])

          // TODO.........SUM
          /* THIS IS TO ADD the sum up */
          STCOut2018[0] = this.STCIn2
          STCOut2018[1] = this.STCIn3
          STCOut2018[3] = this.AL_SING + this.AASing
          STCOut2018[6] = this.CA[this.nMin * this.STCIn4]
          STCOut2018[7] = this.DBSA * this.oMin
          STCOut2018[9] = (this.DPA + this.ADPA) * this.mMin
          STCOut2018[10] = this.DPA * this.lMin
          STCOut2018[8] = STCOut2018[9] + STCOut2018[10]
          STCOut2018[61] = (this.SDPGPA + this.SADPGPA) * this.qMin
          STCOut2018[62] = this.SDPGPA * this.pMin
          STCOut2018[60] = STCOut2018[61] + STCOut2018[62]
          STCOut2018[73] = this.CA[this.nMin * this.STCIn21] + this.NBCA[this.nMin * this.STCIn21]
          if (this.STCIn8 === true) {
            STCOut2018[11] = this.DIS_DA * (this.nMin * (this.STCIn10 + this.STCIn22) + this.odMin + this.ldMin + this.mdMin + this.STCIn19)
          } else {
            STCOut2018[11] = this.DIS_DA * this.STCIn19
          }
          STCOut2018[24] = STCOut2018[3] + STCOut2018[6] + STCOut2018[7] + STCOut2018[8] + STCOut2018[60] + STCOut2018[11] + STCOut2018[73]
          STCOut2018[24] = STCOut2018[24] + self_DISABLE_deduct + sps_DISABLE_deduct
          STCOut2018[12] = this.CA[(1 - this.nMin) * this.STCIn4]
          STCOut2018[13] = this.DBSA * (this.STCIn5 - this.oMin)
          STCOut2018[15] = (this.DPA + this.ADPA) * (this.STCIn6 - this.mMin)
          STCOut2018[16] = this.DPA * (this.STCIn7 - this.lMin)
          STCOut2018[14] = STCOut2018[15] + STCOut2018[16]
          STCOut2018[64] = (this.SDPGPA + this.SADPGPA) * (this.STCIn17 - this.qMin)
          STCOut2018[65] = this.SDPGPA * (this.STCIn18 - this.pMin)
          STCOut2018[63] = STCOut2018[64] + STCOut2018[65]
          STCOut2018[74] = this.CA[(1 - this.nMin) * this.STCIn21] + this.NBCA[(1 - this.nMin) * this.STCIn21]
          if (this.STCIn8 === true) {
            STCOut2018[17] = this.DIS_DA * ((1 - this.nMin) * (this.STCIn10 + this.STCIn22) + this.STCIn11 - this.odMin + this.STCIn13 - this.ldMin + this.STCIn12 - this.mdMin + this.STCIn20)
          } else {
            STCOut2018[17] = this.DIS_DA * this.STCIn20
          }
          STCOut2018[25] = STCOut2018[3] + STCOut2018[12] + STCOut2018[13] + STCOut2018[14] + STCOut2018[63] + STCOut2018[17] + STCOut2018[74]
          STCOut2018[27] = this.netSelfI - STCOut2018[24]
          if (STCOut2018[27] < 0) STCOut2018[27] = 0
          STCOut2018[28] = this.netSpouseI - STCOut2018[25]
          if (STCOut2018[28] < 0) STCOut2018[28] = 0
          STCOut2018[30] = Math.floor(this.CompTP(this.slfStdTP, STCOut2018[27]))
          STCOut2018[34] = this.slfMinStd
          STCOut2018[31] = Math.floor(this.CompTP(this.spsStdTP, STCOut2018[28]))
          STCOut2018[35] = this.spsMinStd
          STCOut2018[32] = STCOut2018[30] + STCOut2018[31]
          this.slfRebate = this.CalculateRebate(STCOut2018[30], this.YrEnd)
          this.spsRebate = this.CalculateRebate(STCOut2018[31], this.YrEnd)
          STCOut2018[37] = this.nMin * this.STCIn4
          STCOut2018[38] = this.oMin
          STCOut2018[39] = this.mMin
          STCOut2018[40] = this.lMin
          STCOut2018[69] = this.qMin
          STCOut2018[70] = this.pMin
          STCOut2018[41] = (1 - this.nMin) * this.STCIn4
          STCOut2018[42] = this.STCIn5 - this.oMin
          STCOut2018[43] = this.STCIn6 - this.mMin
          STCOut2018[44] = this.STCIn7 - this.lMin
          STCOut2018[71] = this.STCIn17 - this.qMin
          STCOut2018[72] = this.STCIn18 - this.pMin
          STCOut2018[76] = this.nMin * this.STCIn21
          STCOut2018[77] = (1 - this.nMin) * this.STCIn21
          if (this.STCIn8 === true) {
            STCOut2018[45] = this.nMin * (this.STCIn10 + this.STCIn22)
            STCOut2018[46] = this.odMin
            STCOut2018[47] = this.mdMin
            STCOut2018[48] = this.ldMin
            STCOut2018[49] = STCOut2018[45] + STCOut2018[46] + STCOut2018[47] + STCOut2018[48] + this.STCIn19
            STCOut2018[50] = (1 - this.nMin) * (this.STCIn10 + this.STCIn22)
            STCOut2018[51] = this.STCIn11 - this.odMin
            STCOut2018[52] = this.STCIn12 - this.mdMin
            STCOut2018[53] = this.STCIn13 - this.ldMin
            STCOut2018[54] = STCOut2018[50] + STCOut2018[51] + STCOut2018[52] + STCOut2018[53] + this.STCIn20
          } else {
            STCOut2018[49] = this.STCIn19
            STCOut2018[54] = this.STCIn20
          }
          STCOut2018[2] = this.STCIn2 + this.STCIn3
          STCOut2018[4] = this.AL_MARR + this.AAMarr // /////////
          STCOut2018[18] = this.CA[this.STCIn4]
          STCOut2018[19] = this.DBSA * this.STCIn5
          STCOut2018[21] = (this.DPA + this.ADPA) * this.STCIn6
          STCOut2018[22] = this.DPA * this.STCIn7
          STCOut2018[20] = STCOut2018[21] + STCOut2018[22]
          STCOut2018[67] = (this.SDPGPA + this.SADPGPA) * this.STCIn17
          STCOut2018[68] = this.SDPGPA * this.STCIn18
          STCOut2018[66] = STCOut2018[67] + STCOut2018[68]
          STCOut2018[75] = this.CA[this.STCIn21] + this.NBCA[this.STCIn21]
          if (this.STCIn8 === true) {
            if ((this.STCIn9 === true) && ((this.STCIn2 - STCOut2018[3] - STCOut2018[57]) > 0)) {
              STCOut2018[23] = this.DIS_DA * (1 + this.STCIn10 + this.STCIn11 + this.STCIn12 + this.STCIn13 + this.STCIn19 + this.STCIn20 + this.STCIn22)
              // console.log('JJJJJ', 1, this.STCIn10, this.STCIn11, this.STCIn12, this.STCIn13, this.STCIn19, this.STCIn20, this.STCIn22)
              STCOut2018[55] = true
              this.spsDDA = true
            } else {
              STCOut2018[23] = this.DIS_DA * (this.STCIn10 + this.STCIn11 + this.STCIn12 + this.STCIn13 + this.STCIn19 + this.STCIn20 + this.STCIn22)
              this.spsDDA = false
            }
          } else { // STCIn8 === false
            STCOut2018[23] = this.DIS_DA * (this.STCIn19 + this.STCIn20)
          }
          STCOut2018[26] = STCOut2018[4] + STCOut2018[18] + STCOut2018[19] + STCOut2018[20] + STCOut2018[66] + STCOut2018[23] + STCOut2018[75]
          STCOut2018[26] = STCOut2018[26] + self_DISABLE_deduct + sps_DISABLE_deduct
          STCOut2018[29] = this.netJointI - STCOut2018[26]
          if (STCOut2018[29] < 0) STCOut2018[29] = 0
          // console.log('JJJJoin ', this.jointStdTP, STCOut2018[29], this.netJointI, this.STD_RATE / 100)
          STCOut2018[33] = Math.floor(this.CompTP(this.jointStdTP, STCOut2018[29]))
          STCOut2018[36] = this.StdFlag

          if (this.STCIn8) {
            // 有供養傷殘
            // console.log('有供養傷殘: ', this.STCIn2, STCOut2018[3], STCOut2018[57])
            if ((this.STCIn9 === true) && ((this.STCIn2 - STCOut2018[3] - STCOut2018[57]) > 0)) {
              STCOut2018[23] = this.DIS_DA * (1 + this.STCIn10 + this.STCIn11 + this.STCIn12 + this.STCIn13 + this.STCIn19 + this.STCIn20 + this.STCIn22)
              STCOut2018[55] = true
              this.spsDDA = true
            } else {
              STCOut2018[23] = this.DIS_DA * (this.STCIn10 + this.STCIn11 + this.STCIn12 + this.STCIn13 + this.STCIn19 + this.STCIn20 + this.STCIn22)
              this.spsDDA = false
            }
            STCOut2018[17] = this.DIS_DA * ((1 - this.nMin) * (this.STCIn10 + this.STCIn22) + this.STCIn11 - this.odMin + this.STCIn13 - this.ldMin + this.STCIn12 - this.mdMin + this.STCIn20)
            STCOut2018[24] = STCOut2018[3] + STCOut2018[6] + STCOut2018[7] + STCOut2018[8] + STCOut2018[60] + STCOut2018[11] + STCOut2018[73]
            STCOut2018[24] = STCOut2018[24] + self_DISABLE_deduct + sps_DISABLE_deduct
            STCOut2018[25] = STCOut2018[3] + STCOut2018[12] + STCOut2018[13] + STCOut2018[14] + STCOut2018[63] + STCOut2018[17] + STCOut2018[74]
            STCOut2018[26] = STCOut2018[4] + STCOut2018[18] + STCOut2018[19] + STCOut2018[20] + STCOut2018[66] + STCOut2018[23] + STCOut2018[75]
            STCOut2018[26] = STCOut2018[26] + self_DISABLE_deduct + sps_DISABLE_deduct
            STCOut2018[49] = STCOut2018[45] + STCOut2018[46] + STCOut2018[47] + STCOut2018[48] + this.STCIn19
            STCOut2018[54] = STCOut2018[50] + STCOut2018[51] + STCOut2018[52] + STCOut2018[53] + this.STCIn20
          } else {
            // 沒有供養傷殘
            STCOut2018[17] = this.DIS_DA * this.STCIn20
            STCOut2018[23] = this.DIS_DA * (this.STCIn19 + this.STCIn20)
            STCOut2018[24] = STCOut2018[3] + STCOut2018[6] + STCOut2018[7] + STCOut2018[8] + STCOut2018[60] + STCOut2018[11] + STCOut2018[73]
            STCOut2018[24] = STCOut2018[24] + self_DISABLE_deduct + sps_DISABLE_deduct
            STCOut2018[25] = STCOut2018[3] + STCOut2018[12] + STCOut2018[13] + STCOut2018[14] + STCOut2018[63] + STCOut2018[17] + STCOut2018[74]
            STCOut2018[26] = STCOut2018[4] + STCOut2018[18] + STCOut2018[19] + STCOut2018[20] + STCOut2018[66] + STCOut2018[23] + STCOut2018[75]
            STCOut2018[26] = STCOut2018[26] + self_DISABLE_deduct + sps_DISABLE_deduct
            STCOut2018[27] = this.netSelfI - STCOut2018[24]
            STCOut2018[28] = this.netSpouseI - STCOut2018[25]
            STCOut2018[29] = this.netJointI - STCOut2018[26]
            STCOut2018[49] = this.STCIn19
            STCOut2018[54] = this.STCIn20
          }
          // console.log('1GGGG', STCOut2018[4], STCOut2018[12], STCOut2018[13], STCOut2018[14], STCOut2018[63], STCOut2018[17], STCOut2018[74])
          // console.log('2GGGG', STCOut2018[3], STCOut2018[12], STCOut2018[13], STCOut2018[14], STCOut2018[63], STCOut2018[17], STCOut2018[74])
        }
      }

      // 配偶是傷殘
      if (this.spsDDA) {
        if (STCOut2018[78] > 0) {
          STCOut2018[57] = STCOut2018[57] - STCOut2018[78]
        }
      }

      if (STCOut2018[27] < 0) STCOut2018[27] = 0
      if (STCOut2018[28] < 0) STCOut2018[28] = 0
      if (STCOut2018[29] < 0) STCOut2018[29] = 0
      STCOut2018[30] = Math.floor(this.CompTP(this.slfStdTP, STCOut2018[27]))
      STCOut2018[31] = Math.floor(this.CompTP(this.spsStdTP, STCOut2018[28]))
      STCOut2018[33] = Math.floor(this.CompTP(this.jointStdTP, STCOut2018[29])) // have rebate

      if (this.martial_status === 'S') { // 或只單一人有收入
        STCOut2018[32] = STCOut2018[30]
      } else {
        STCOut2018[32] = STCOut2018[30] + STCOut2018[31]
      }

      // TODO - Rebate
      this.JARebate = 0
      this.slfRebate = 0
      this.spsRebate = 0

      // console.log('pre 30: ', this.slfStdTP, STCOut2018[27])
      // console.log('pre 31: ', this.spsStdTP, STCOut2018[28])
      // console.log('30,31: ', STCOut2018[30], STCOut2018[31])
      // console.log('33,32: ', STCOut2018[33], STCOut2018[32])
      if (this.martial_status === 'M' && this.STCIn3 !== 0 && this.STCIn2 !== 0) {
        // console.log('(1)合拼 vs 分開: ', STCOut2018[33], STCOut2018[32])

        // 分開抵啲
        if ((STCOut2018[33] - this.JARebate) < (STCOut2018[32] - this.slfRebate - this.spsRebate)) {
          // 配偶是傷殘(JAD)
          if (this.spsDDA) {
            this.STCMainRV = 42

            STCOut2018[24] = STCOut2018[3]
            STCOut2018[24] = STCOut2018[24] + self_DISABLE_deduct + sps_DISABLE_deduct
            STCOut2018[25] = STCOut2018[3] + STCOut2018[12] + STCOut2018[13] + STCOut2018[14] + STCOut2018[63] + STCOut2018[17] + STCOut2018[74] + STCOut2018[6] + STCOut2018[7] + STCOut2018[8] + STCOut2018[60] + STCOut2018[11] + STCOut2018[73]

            STCOut2018[27] = parseFloat(this.netSelfI) - parseFloat(STCOut2018[24]) + parseFloat(STCOut2018[78])
            if (STCOut2018[27] < 0) STCOut2018[27] = 0
            STCOut2018[28] = parseFloat(this.netSpouseI) - parseFloat(STCOut2018[25]) - parseFloat(STCOut2018[78])
            if (STCOut2018[28] < 0) STCOut2018[28] = 0

            if (STCOut2018[78] > 0) {
              STCOut2018[57] = STCOut2018[57] - parseFloat(STCOut2018[78])
              STCOut2018[58] = STCOut2018[58] + parseFloat(STCOut2018[78])

              this.netSelfI = this.STCIn2 - this.STCIn14 + parseFloat(STCOut2018[78])
              if (this.netSelfI < 0) this.netSelfI = 0
              this.netSpouseI = this.STCIn3 - this.STCIn15 - parseFloat(STCOut2018[78])
              if (this.netSpouseI < 0) this.netSpouseI = 0

              this.slfStdTP = this.netSelfI * this.STD_RATE / 100 // self TP at standard rate
              this.spsStdTP = this.netSpouseI * this.STD_RATE / 100 // spouse TP at standard rate
            }
            // console.table(['### ', this.slfStdTP, STCOut2018[27], this.netSelfI, STCOut2018[24], STCOut2018[78]])
            STCOut2018[30] = Math.floor(this.CompTP(this.slfStdTP, STCOut2018[27]))
            STCOut2018[34] = this.StdFlag
            STCOut2018[31] = Math.floor(this.CompTP(this.spsStdTP, STCOut2018[28]))
            STCOut2018[35] = this.StdFlag
            STCOut2018[32] = STCOut2018[30] + STCOut2018[31]
            this.slfRebate = this.CalculateRebate(STCOut2018[30], this.YrEnd)
            this.spsRebate = this.CalculateRebate(STCOut2018[31], this.YrEnd)

            // （合拼）與標準稅較低者 TP 大於 （分開）現時的 Tax Position
            // console.log('(2)傷殘配偶 - 合拼 vs 分開: ', STCOut2018[33], STCOut2018[32], STCOut2018[27], STCOut2018[28])
            if (STCOut2018[33] >= STCOut2018[32]) {
              this.STCMainRV = 45 // JAD
            }
          } else {
            this.STCMainRV = 40
          }
        } else {
          this.STCMainRV = 30
        }
      }

      STCOut2018[73] = this.CA[this.STCIn21] + this.NBCA[this.STCIn21]
      return STCOut2018
    },
    CompTP (StdTP, NCI) {
      var PrgTP
      var i
      if (NCI <= 0) { // Check for zero or negative NCI
        PrgTP = 0
      } else { // Compute TP using progressive rates
        for (i = this.N_TAX_RANGES; i > 0; i--) {
          if (NCI > this.ACC_RANGE[i]) {
            break
          }
        }
        PrgTP = this.TAX[i] + (NCI - this.ACC_RANGE[i]) * this.TAX_RATE[i + 1] / 100
      }
      // console.log(this.N_TAX_RANGES, this.ACC_RANGE, PrgTP)
      if (Math.floor(StdTP) < Math.floor(PrgTP)) {
        this.StdFlag = true
        return StdTP
      } else {
        this.StdFlag = false
        return PrgTP
      }
    },
    CalculateRebate (tax, YrEnd) {
      var rebateAmt = 0
      var hasRebate = false
      if (hasRebate) {
        rebateAmt = Math.ceil(tax * 0 / 100)
        if (rebateAmt > 0) {
          rebateAmt = 0
        }
      }
      return rebateAmt
    },
    cal_join_min () {
      // var vm = this
      var InLoopCnt = 0
      var i
      var p, q, n, o, l, m
      var od, ld, md
      // var lMin, lMin1, ldMin, ldMin1, mMin, mMin1, mdMin, mdMin1, nMin, nMin1, oMin, oMin1, odMin, odMin1, pMin, pMin1, qMin, qMin1
      // var STCIn17_, STCIn5_, STCIn7_, STCIn6_, STCIn11_, STCIn13_, STCIn12_, STCIn18_
      var SavPar0, SavPar1, SavPar2, SavPar3, SavPar4, SavPar5, SavPar6, SavPar7, SavPar8, SavPar9, SavPar10, SavPar11, SavPar12, SavPar13, SavPar14, SavPar15, SavPar16, SavPar17, SavPar18, SavPar19, SavPar20, SavPar21, SavPar22, SavPar23, SavPar24, SavPar26, SavPar27, SavPar28, SavPar29, SavPar30, SavPar31, SavPar32, SavPar33, SavPar34, SavPar35, SavPar36, SavPar37, SavPar38, SavPar39, SavPar40, SavPar41
      var oChCount, oSTCIn5, oSTCIn7, oSTCIn6, oSTCIn11, oSTCIn13, oSTCIn12, oSTCIn18, oSTCIn17
      var nol_Loops = (this.STCIn18 + 1) * (this.STCIn17 + 1) * (this.ChCount + 1) * (this.STCIn5 + 1) * (this.STCIn7 + 1)
      var nol_LoopCnt = 0.0
      var Calculating, Restarting

      if (!Restarting) {
        if (this.STCIn4 + this.STCIn21 > 0) {
          this.ChCount = 1
        } else { // STCIn4+STCIn21 === 0
          this.ChCount = 0
        }
        this.slfNCI = 0
        this.slfMinNCI = 0
        this.spsNCI = 0
        this.slfTP = 0
        this.spsTP = 0
        this.slfStd = false
        this.spsStd = false
        this.spsDDA = false
        this.MinTP = this.netSelfI + this.netSpouseI
        if (this.MinTP === 0) this.MinTP = 1
        this.MinTP1 = this.netSelfI + this.netSpouseI
        if (this.MinTP1 === 0) this.MinTP1 = 1
        this.MinJntTP = this.netSelfI + this.netSpouseI
        if (this.MinJntTP === 0) this.MinJntTP = 1
        this.MinJntTP1 = this.netSelfI + this.netSpouseI
        if (this.MinJntTP1 === 0) this.MinJntTP1 = 1
        this.DDAspsGranted = false
        this.TotalDIS_DA = this.DIS_DA * (this.STCIn10 + this.STCIn11 + this.STCIn12 + this.STCIn13 + this.STCIn22) // Total DDA available (other than DDA under ERCE)
        this.nMin = 0
        this.oMin = 0
        this.lMin = 0
        this.mMin = 0
        this.odMin = 0
        this.ldMin = 0
        this.mdMin = 0
        this.pMin = 0
        this.qMin = 0
        this.nMin1 = 0
        this.oMin1 = 0
        this.lMin1 = 0
        this.mMin1 = 0
        this.odMin1 = 0
        this.ldMin1 = 0
        this.mdMin1 = 0
        this.pMin1 = 0
        this.qMin1 = 0
        this.ChCount_ = this.ChCount
        this.STCIn5_ = this.STCIn5
        this.STCIn7_ = this.STCIn7
        this.STCIn6_ = this.STCIn6
        this.STCIn11_ = this.STCIn11
        this.STCIn13_ = this.STCIn13
        this.STCIn12_ = this.STCIn12
        this.STCIn18_ = this.STCIn18
        this.STCIn17_ = this.STCIn17
        nol_Loops = (this.STCIn18 + 1) * (this.STCIn17 + 1) * (this.ChCount + 1) * (this.STCIn5 + 1) * (this.STCIn7 + 1)
        nol_LoopCnt = 0
      } else { // Restarting a suspended calculation
      }

      if (this.STCIn8 === true) {
        // console.log('cal_join_min...', this.STCIn18_)
        for (p = this.STCIn18_; p >= 0; p--) {
          for (q = this.STCIn17_; q >= 0; q--) {
            for (n = this.ChCount_; n >= 0; n--) {
              this.slfDisC_No = n * (this.STCIn10 + this.STCIn22)
              for (o = this.STCIn5_; o >= 0; o--) {
                for (l = this.STCIn7_; l >= 0; l--) {
                  for (m = this.STCIn6_; m >= 0; m--) {
                    this.slfNCItmp = this.netSelfI - this.AL_SING - this.AASing - this.CA[n * this.STCIn4] - this.DBSA * o - this.DPA * (l + m) - this.ADPA * m -
                    this.SDPGPA * (p + q) - this.SADPGPA * q - this.DIS_DA * this.STCIn19 - (this.CA[n * this.STCIn21] + this.NBCA[n * this.STCIn21])
                    this.spsNCItmp = this.netSpouseI - this.AL_SING - this.AASing - this.CA[(1 - n) * this.STCIn4] - this.DBSA * (this.STCIn5 - o) - this.DPA * (this.DPNo - (l + m)) - this.ADPA * (this.ADPNo - m) - this.TotalDIS_DA -
                    this.SDPGPA * (this.SDPNo - (p + q)) - this.SADPGPA * (this.SADPNo - q) - this.DIS_DA * this.STCIn20 - (this.CA[(1 - n) * this.STCIn21] + this.NBCA[(1 - n) * this.STCIn21])
                    for (od = this.STCIn11_; od >= 0; od--) {
                      if ((od <= o) && ((this.STCIn11 - od) <= (this.STCIn5 - o))) {
                        for (ld = this.STCIn13_; ld >= 0; ld--) {
                          if ((ld <= l) && ((this.STCIn13 - ld) <= (this.STCIn7 - l))) {
                            for (md = this.STCIn12_; md >= 0; md--) {
                              if ((md <= m) && ((this.STCIn12 - md) <= (this.STCIn6 - m))) {
                                this.slfDIS_DA = this.DIS_DA * (this.slfDisC_No + od + ld + md)
                                this.slfNCI = this.slfNCItmp - this.slfDIS_DA
                                this.spsNCI = this.spsNCItmp + this.slfDIS_DA
                                this.spsDDA = ((this.STCIn9 === true) && (this.slfNCI > 0) && (this.spsNCI <= 0))
                                if (this.slfNCI > 0) {
                                  for (i = this.N_TAX_RANGES; i >= 1; i--) {
                                    if (this.slfNCI > this.ACC_RANGE[i]) break
                                  }
                                  this.slfTP = this.TAX[i] + (this.slfNCI - this.ACC_RANGE[i]) * this.TAX_RATE[i + 1] / 100
                                } else {
                                  this.slfNCI = 0
                                  this.slfTP = 0
                                }
                                if (Math.floor(this.slfStdTP) < Math.floor(this.slfTP)) {
                                  this.slfStd = true
                                  this.slfTP = this.slfStdTP
                                } else {
                                  this.slfStd = false
                                }
                                if (this.spsNCI > 0) {
                                  for (i = this.N_TAX_RANGES; i >= 1; i--) {
                                    if (this.spsNCI > this.ACC_RANGE[i]) break
                                  }
                                  this.spsTP = this.TAX[i] + (this.spsNCI - this.ACC_RANGE[i]) * this.TAX_RATE[i + 1] / 100
                                } else {
                                  this.spsNCI = 0
                                  this.spsTP = 0
                                }
                                if (Math.floor(this.spsStdTP) < Math.floor(this.spsTP)) {
                                  this.spsStd = true
                                  this.spsTP = this.spsStdTP
                                } else {
                                  this.spsStd = false
                                }
                                this.CurTP = Math.floor(this.slfTP + this.spsTP - this.CalculateRebate(this.slfTP, this.YrEnd) - this.CalculateRebate(this.spsTP, this.YrEnd))
                                if (this.CurTP < 0) this.CurTP = 0
                                this.CurJntTP = Math.floor(this.slfTP + this.spsTP)
                                if (this.CurJntTP < 0) this.CurJntTP = 0
                                if ((this.CurTP < this.MinTP) || ((this.CurTP === this.MinTP) && (this.CurJntTP < this.MinJntTP)) || ((this.CurTP === this.MinTP) && (this.CurJntTP === this.MinJntTP) && (this.slfNCI < this.slfMinNCI))) {
                                  this.MinTP = this.CurTP
                                  this.MinJntTP = this.CurJntTP
                                  this.slfMinStd = this.slfStd
                                  this.spsMinStd = this.spsStd
                                  this.slfMinNCI = this.slfNCI
                                  this.nMin = n
                                  this.oMin = o
                                  this.lMin = l
                                  this.mMin = m
                                  this.odMin = od
                                  this.ldMin = ld
                                  this.mdMin = md
                                  this.pMin = p
                                  this.qMin = q
                                }
                                if (this.spsDDA) {
                                  this.DDAspsGranted = true
                                  if ((this.CurTP < this.MinTP1) || ((this.CurTP === this.MinTP1) && (this.CurJntTP < this.MinJntTP1)) || ((this.CurTP === this.MinTP1) && (this.CurJntTP === this.MinJntTP1) && (this.slfNCI < this.slfMinNCI1))) {
                                    this.MinTP1 = this.CurTP
                                    this.MinJntTP1 = this.CurJntTP
                                    this.slfMinStd1 = this.slfStd
                                    this.spsMinStd1 = this.spsStd
                                    this.slfMinNCI1 = this.slfNCI
                                    this.nMin1 = n
                                    this.oMin1 = o
                                    this.lMin1 = l
                                    this.mMin1 = m
                                    this.odMin1 = od
                                    this.ldMin1 = ld
                                    this.mdMin1 = md
                                    this.pMin1 = p
                                    this.qMin1 = q
                                  }
                                }
                                InLoopCnt = InLoopCnt + 1
                                if (InLoopCnt >= this.InLoopLim) {
                                  SavPar0 = this.ChCount
                                  SavPar1 = this.DPNo
                                  SavPar2 = this.ADPNo
                                  SavPar3 = this.nMin
                                  SavPar4 = this.oMin
                                  SavPar5 = this.lMin
                                  SavPar6 = this.mMin
                                  SavPar7 = this.nMin1
                                  SavPar8 = this.oMin1
                                  SavPar9 = this.lMin1
                                  SavPar10 = this.mMin1
                                  SavPar11 = this.odMin
                                  SavPar12 = this.ldMin
                                  SavPar13 = this.mdMin
                                  SavPar14 = this.odMin1
                                  SavPar15 = this.ldMin1
                                  SavPar16 = this.mdMin1
                                  SavPar17 = this.MinTP
                                  SavPar18 = this.MinTP1
                                  SavPar19 = this.slfMinStd
                                  SavPar20 = this.spsMinStd
                                  SavPar21 = this.slfMinNCI
                                  SavPar22 = this.slfMinStd1
                                  SavPar23 = this.spsMinStd1
                                  SavPar24 = this.slfMinNCI1
                                  SavPar26 = this.DDAspsGranted
                                  SavPar27 = this.TotalDIS_DA
                                  SavPar28 = this.slfStdTP
                                  SavPar29 = this.spsStdTP
                                  SavPar30 = this.jointStdTP
                                  SavPar31 = this.netSelfI
                                  SavPar32 = this.netSpouseI
                                  SavPar33 = this.netJointI
                                  SavPar34 = this.SDPNo
                                  SavPar35 = this.SADPNo
                                  SavPar36 = this.pMin
                                  SavPar37 = this.qMin
                                  SavPar38 = this.pMin1
                                  SavPar39 = this.qMin1
                                  SavPar40 = this.MinJntTP
                                  SavPar41 = this.MinJntTP1
                                  if (md > 0) {
                                    oSTCIn12 = md - 1
                                    oSTCIn13 = ld
                                    oSTCIn11 = od
                                    oSTCIn6 = m
                                    oSTCIn7 = l
                                    oSTCIn5 = o
                                    oChCount = n
                                    oSTCIn17 = q
                                    oSTCIn18 = p
                                  } else if (ld > 0) {
                                    oSTCIn12 = this.STCIn12
                                    oSTCIn13 = ld - 1
                                    oSTCIn11 = od
                                    oSTCIn6 = m
                                    oSTCIn7 = l
                                    oSTCIn5 = o
                                    oChCount = n
                                    oSTCIn17 = q
                                    oSTCIn18 = p
                                  } else if (od > 0) {
                                    oSTCIn12 = this.STCIn12
                                    oSTCIn13 = this.STCIn13
                                    oSTCIn11 = od - 1
                                    oSTCIn6 = m
                                    oSTCIn7 = l
                                    oSTCIn5 = o
                                    oChCount = n
                                    oSTCIn17 = q
                                    oSTCIn18 = p
                                  } else if (m > 0) {
                                    oSTCIn12 = this.STCIn12
                                    oSTCIn13 = this.STCIn13
                                    oSTCIn11 = this.STCIn11
                                    oSTCIn6 = m - 1
                                    oSTCIn7 = l
                                    oSTCIn5 = o
                                    oChCount = n
                                    oSTCIn17 = q
                                    oSTCIn18 = p
                                  } else if (l > 0) {
                                    oSTCIn12 = this.STCIn12
                                    oSTCIn13 = this.STCIn13
                                    oSTCIn11 = this.STCIn11
                                    oSTCIn6 = this.STCIn6
                                    oSTCIn7 = l - 1
                                    nol_LoopCnt = nol_LoopCnt + 1
                                    oSTCIn5 = o
                                    oChCount = n
                                    oSTCIn17 = q
                                    oSTCIn18 = p
                                  } else if (o > 0) {
                                    oSTCIn12 = this.STCIn12
                                    oSTCIn13 = this.STCIn13
                                    oSTCIn11 = this.STCIn11
                                    oSTCIn6 = this.STCIn6
                                    oSTCIn7 = this.STCIn7
                                    nol_LoopCnt = nol_LoopCnt + 1
                                    oSTCIn5 = o - 1
                                    oChCount = n
                                    oSTCIn17 = q
                                    oSTCIn18 = p
                                  } else if (n > 0) {
                                    oSTCIn12 = this.STCIn12
                                    oSTCIn13 = this.STCIn13
                                    oSTCIn11 = this.STCIn11
                                    oSTCIn6 = this.STCIn6
                                    oSTCIn7 = this.STCIn7
                                    nol_LoopCnt = nol_LoopCnt + 1
                                    oSTCIn5 = this.STCIn5
                                    oChCount = n - 1
                                    oSTCIn17 = q
                                    oSTCIn18 = p
                                  } else if (q > 0) {
                                    oSTCIn12 = this.STCIn12
                                    oSTCIn13 = this.STCIn13
                                    oSTCIn11 = this.STCIn11
                                    oSTCIn6 = this.STCIn6
                                    oSTCIn7 = this.STCIn7
                                    nol_LoopCnt = nol_LoopCnt + 1
                                    oSTCIn5 = this.STCIn5
                                    oChCount = this.ChCount
                                    oSTCIn17 = q - 1
                                    oSTCIn18 = p
                                  } else {
                                    oSTCIn12 = this.STCIn12
                                    oSTCIn13 = this.STCIn13
                                    oSTCIn11 = this.STCIn11
                                    oSTCIn6 = this.STCIn6
                                    oSTCIn7 = this.STCIn7
                                    nol_LoopCnt = nol_LoopCnt + 1
                                    oSTCIn5 = this.STCIn5
                                    oChCount = this.ChCount
                                    oSTCIn17 = this.STCIn17
                                    oSTCIn18 = p - 1
                                  }
                                  Restarting = true
                                  // setTimeout('TCMain()", 1)
                                  return 0
                                }
                              }
                            } // Next
                            this.STCIn12_ = this.STCIn12 // necessary for "restart" implementation
                          } //
                        } // Next
                        this.STCIn13_ = this.STCIn13 //
                      } //
                    } // Next
                    this.STCIn11_ = this.STCIn11 //
                  } // Next
                  nol_LoopCnt = nol_LoopCnt + 1 //
                  if (nol_LoopCnt % 41 === 0) {
                    if (parent.browserID === 'IE4Win31') { // Display percentage completed
                      window.status = '完成' + Math.floor(nol_LoopCnt * 100 / nol_Loops) + '%'
                    } else {
                      window.status = '正在計算薪俸稅，完成' + Math.floor(nol_LoopCnt * 100 / nol_Loops) + '%'
                    }
                  }
                  this.STCIn6_ = this.STCIn6 //
                } // Next
                this.STCIn7_ = this.STCIn7 //
              } // Next
              this.STCIn5_ = this.STCIn5 //
            } // Next n
            this.ChCount_ = this.ChCount
          } // Next q
          this.STCIn17_ = this.STCIn17
        } // Next p
      } else { // ClaimDDA === false
        for (p = this.STCIn18_; p >= 0; p--) {
          for (q = this.STCIn17_; q >= 0; q--) {
            for (n = this.ChCount_; n >= 0; n--) {
              for (o = this.STCIn5_; o >= 0; o--) {
                for (l = this.STCIn7_; l >= 0; l--) {
                  for (m = this.STCIn6_; m >= 0; m--) {
                    this.slfNCI = this.netSelfI - this.AL_SING - this.AASing - this.CA[n * this.STCIn4] - this.DBSA * o - this.DPA * (l + m) - this.ADPA * m -
                    this.SDPGPA * (p + q) - this.SADPGPA * q - this.DIS_DA * this.STCIn19 - (this.CA[n * this.STCIn21] + this.NBCA[n * this.STCIn21])
                    if (this.slfNCI < 0) this.slfNCI = 0
                    this.spsNCI = this.netSpouseI - this.AL_SING - this.AASing - this.CA[(1 - n) * this.STCIn4] - this.DBSA * (this.STCIn5 - o) - this.DPA * (this.DPNo - (l + m)) - this.ADPA * (this.ADPNo - m) -
                    this.SDPGPA * (this.SDPNo - (p + q)) - this.SADPGPA * (this.SADPNo - q) - this.DIS_DA * this.STCIn20 - (this.CA[(1 - n) * this.STCIn21] + this.NBCA[(1 - n) * this.STCIn21])
                    if (this.spsNCI < 0) this.spsNCI = 0
                    this.slfTP = this.CompTP(this.slfStdTP, this.slfNCI)
                    this.slfStd = this.StdFlag
                    this.spsTP = this.CompTP(this.spsStdTP, this.spsNCI)
                    this.spsStd = this.StdFlag
                    this.CurTP = Math.floor(this.slfTP + this.spsTP - this.CalculateRebate(this.slfTP, this.YrEnd) - this.CalculateRebate(this.spsTP, this.YrEnd))
                    if (this.CurTP < 0) this.CurTP = 0
                    this.CurJntTP = Math.floor(this.slfTP + this.spsTP)
                    if (this.CurJntTP < 0) this.CurJntTP = 0
                    // if ((CurTP<MinTP) || ((CurTP==MinTP) && ((slfNCI<slfMinNCI) || (slfNCI==0)))) {
                    if ((this.CurTP < this.MinTP) || ((this.CurTP === this.MinTP) && (this.CurJntTP < this.MinJntTP)) || ((this.CurTP === this.MinTP) && (this.CurJntTP === this.MinJntTP) && (this.slfNCI < this.slfMinNCI))) {
                      this.MinTP = this.CurTP
                      this.MinJntTP = this.CurJntTP
                      this.slfMinStd = this.slfStd
                      this.spsMinStd = this.spsStd
                      this.slfMinNCI = this.slfNCI
                      this.nMin = n
                      this.oMin = o
                      this.lMin = l
                      this.mMin = m
                      this.pMin = p
                      this.qMin = q
                    }
                    InLoopCnt = InLoopCnt + 1
                    if (InLoopCnt >= this.InLoopLim) {
                      SavPar0 = this.ChCount
                      SavPar1 = this.DPNo
                      SavPar2 = this.ADPNo
                      SavPar3 = this.nMin
                      SavPar4 = this.oMin
                      SavPar5 = this.lMin
                      SavPar6 = this.mMin
                      SavPar17 = this.MinTP
                      SavPar19 = this.slfMinStd
                      SavPar20 = this.spsMinStd
                      SavPar21 = this.slfMinNCI
                      SavPar26 = this.DDAspsGranted
                      SavPar28 = this.slfStdTP
                      SavPar29 = this.spsStdTP
                      SavPar30 = this.jointStdTP
                      SavPar31 = this.netSelfI
                      SavPar32 = this.netSpouseI
                      SavPar33 = this.netJointI
                      SavPar34 = this.SDPNo
                      SavPar35 = this.SADPNo
                      SavPar36 = this.pMin
                      SavPar37 = this.qMin
                      if (m > 0) {
                        oSTCIn6 = m - 1
                        oSTCIn7 = l
                        oSTCIn5 = o
                        oChCount = n
                        oSTCIn17 = q
                        oSTCIn18 = p
                      } else if (l > 0) {
                        oSTCIn6 = this.STCIn6
                        oSTCIn7 = l - 1
                        nol_LoopCnt = nol_LoopCnt + 1
                        oSTCIn5 = o
                        oChCount = n
                        oSTCIn17 = q
                        oSTCIn18 = p
                      } else if (o > 0) {
                        oSTCIn6 = this.STCIn6
                        oSTCIn7 = this.STCIn7
                        nol_LoopCnt = nol_LoopCnt + 1
                        oSTCIn5 = o - 1
                        oChCount = n
                        oSTCIn17 = q
                        oSTCIn18 = p
                      } else if (n > 0) {
                        oSTCIn6 = this.STCIn6
                        oSTCIn7 = this.STCIn7
                        nol_LoopCnt = nol_LoopCnt + 1
                        oSTCIn5 = this.STCIn5
                        oChCount = n - 1
                        oSTCIn17 = q
                        oSTCIn18 = p
                      } else if (q > 0) {
                        oSTCIn6 = this.STCIn6
                        oSTCIn7 = this.STCIn7
                        nol_LoopCnt = nol_LoopCnt + 1
                        oSTCIn5 = this.STCIn5
                        oChCount = this.ChCount
                        oSTCIn17 = q - 1
                        oSTCIn18 = p
                      } else {
                        oSTCIn6 = this.STCIn6
                        oSTCIn7 = this.STCIn7
                        nol_LoopCnt = nol_LoopCnt + 1
                        oSTCIn5 = this.STCIn5
                        oChCount = this.ChCount
                        oSTCIn17 = this.STCIn17
                        oSTCIn18 = p - 1
                      }
                      Restarting = true
                      // setTimeout("STCMain()"', 1)
                      return 0
                    }
                  } // Next
                  nol_LoopCnt = nol_LoopCnt + 1
                  if (nol_LoopCnt % 41 === 0) {
                    if (parent.browserID === 'IE4Win31') {
                      window.status = '完成' + Math.floor(nol_LoopCnt * 100 / nol_Loops) + '%'
                    } else {
                      window.status = '正在計算薪俸稅，完成' + Math.floor(nol_LoopCnt * 100 / nol_Loops) + '%'
                    }
                  }
                  this.STCIn6_ = this.STCIn6
                } // Next
                this.STCIn7_ = this.STCIn7
              } // Next
              this.STCIn5_ = this.STCIn5
            } // Next n
            this.ChCount_ = this.ChCount
          } // Next q
          this.STCIn17_ = this.STCIn17
        } // Next p
      }

      return 0
    },
    return_vm () {
      return {
        'martial_status': this.martial_status,
        '#self_income': this.slfIncome,
        '#spouse_income': this.spsIncome,
        '#self_residence': this.slfResi,
        '#spouse_residence': this.spsResi,
        '#self_oe': this.slfOE,
        '#spouse_oe': this.spsOE,
        '#self_eduexp': this.slfSEE,
        '#spouse_eduexp': this.spsSEE,
        '#self_donation': this.slfDona,
        '#spouse_donation': this.spsDona,
        '#self_mpf': this.slfMpf,
        '#spouse_mpf': this.spsMpf,
        '#self_homeloan': this.slfLoan,
        '#spouse_homeloan': this.spsLoan,
        '#self_elderly': this.slfElder,
        '#self_disabledep': this.slfDisdep,
        '#self_eldresi_amt': this.slfERCE,
        '#spouse_elderly': this.spsElder,
        '#spouse_disabledep': this.spsDisdep,
        '#spouse_eldresi_amt': this.spsERCE,
        '#NBbb': this.NBbb,
        '#CAbb': this.CAbb,
        '#single_parent': this.single_parent,
        '#brosis_dep': this.brosis_dep,
        '#resi_parent': this.resi_parent,
        '#non_resi_parent': this.non_resi_parent,
        '#resi_parent_5560': this.resi_parent_5560,
        '#non_resi_parent_5560': this.non_resi_parent_5560,
        '#NBbb_DIS': this.NBbb_DIS,
        '#CAbb_DIS': this.CAbb_DIS,
        '#brosis_dep_DIS': this.brosis_dep_DIS,
        '#resi_parent_DIS': this.resi_parent_DIS,
        '#non_resi_parent_DIS': this.non_resi_parent_DIS,
        '#spouse_disabled_dependent_DIS': this.spouse_disabled_dependent_DIS
      }
    }
  },
  created () {
    // window.G = {}
    // window.G.vm = this
    this.init()
    this.main1()
    this.get_rate()
    // this.make_STCOut2()
  }
}
