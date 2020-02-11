import vueSlider from 'vue-slider-component'
import TaxNewYear from '@/components/Tax2019.vue'
import Slick from 'vue-slick'
import Switches from 'vue-switches'

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
    return s1.substring(i, j - i + 1).replace('-', '')
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
    if (IsNIL(obj)) obj = 0
  } else {
    obj = 0
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
  AllowChars = '0 .'
  if (!obj) {
    return true
  }
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
  obj = '0'
}

export default {
  name: 'hello',
  components: {
    vueSlider,
    TaxNewYear,
    Slick,
    Switches
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js PWA 1',
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
      s_MedicInsu_min: 0,
      s_MedicInsu_max: 30,

      // slfIncome: 800000,
      // spsIncome: 600000,
      // slfResi: 10000,
      // spsResi: 10000,
      // slfOE: 20000,
      // spsOE: 25000,
      // slfSEE: 12000,
      // spsSEE: 13000,
      // slfDona: 300,
      // spsDona: 400,
      // slfMpf: 5000,
      // spsMpf: 6000,
      // slfLoan: 1300,
      // spsLoan: 1400,
      // slfElder: 1, // 0,
      // slfDisdep: 0, // 0,
      // slfERCE: 4000,
      // spsElder: 0, // 1,
      // spsDisdep: 0, // 1,
      // spsERCE: 0, // 5000,
      // slfRebateAmt: 0,

      martial_status: 'S',
      slfIncome: 0,
      spsIncome: 0,
      slfResi: 0,
      spsResi: 0,
      slfOE: 0,
      spsOE: 0,
      slfSEE: 0,
      spsSEE: 0,
      slfDona: 0,
      spsDona: 0,
      // donation must no less than 100
      slfDona_restrict: 0,
      spsDona_restrict: 0,
      slfMpf: 0,
      spsMpf: 0,
      // 上限 fixed $18,000, like MPF ( 必须有入息 )
      slfBook: 0,
      spsBook: 0,
      slfLoan: 0,
      spsLoan: 0,
      slfElder: 0, // 0,
      slfDisdep: 0, // 0,
      slfERCE: 0,
      slfERCE_forCompute: 0,
      spsElder: 0, // 1,
      spsDisdep: 0, // 1,
      spsERCE: 0, // 5000,
      spsERCE_forCompute: 0,
      slfRebateAmt: 0,

      NBbb: 0, // 1,
      CAbb: 0, // 1,
      single_parent: false, // 1,
      brosis_dep: 0, // 1,
      resi_parent: 0, // 1,
      non_resi_parent: 0, // 1,
      resi_parent_5560: 0, // 1,
      non_resi_parent_5560: 0, // 1,

      NBbb_DIS: 0,
      CAbb_DIS: 0,
      brosis_dep_DIS: 0,
      resi_parent_DIS: 0,
      non_resi_parent_DIS: 0,
      spouse_disabled_dependent_DIS: false, // 1

      slfMedInsu: 0, // onday_onday(1)
      spsMedInsu: 0,
      slfMedInsu_ppl: 0,
      spsMedInsu_ppl: 0,
      self_disabled_DIS: false,
      sps_disabled_DIS: false,
      self_iang_visa: false, // MOCK
      sps_iang_visa: false,
      slfDiseaseExp: 0, // MOCK
      spsDiseaseExp: 0, // MOCK
      slfVolunMpf: 0,
      spsVolunMpf: 0,

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

      STCOut: new Array(80),
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
      slfOE_CAP: 0,
      spsOE_CAP: 0,

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

      sh_elderly: true,
      sh_bb: true,
      sh_bb_dis: true,
      sh_single_parent: true,
      infin_update: 0,
      end: 0,
      progress_1: 0,
      progress_1_max: 6,
      slickOptions: {
        infinite: false,
        dots: true,
        centerMode: true,
        centerPadding: '20px',
        slidesToShow: 1, // Any other options that can be got from plugin documentation
        slidesToScroll: 10,
        swipeToSlide: true,
        mobileFirst: true,
        edgeFriction: 0,
        prevArrow: '<button type="button" class="slick_butn slick-prev"><span class="access">上一項</span></button>',
        nextArrow: '<button type="button" class="slick_butn slick-next"><span class="access">下一項</span></button>',
        end: 0
      },
      lang: {
        martial_single: '單身',
        martial_married: '已婚',
        self: '本人',
        spouse: '配偶',
        sep: '-',

        income: '課稅年度收入', // '入息',
        self_income: '本人-入息',
        spouse_income: '配偶-入息',

        residence: '僱主提供的房屋津貼', // '獲僱主或相聯公司提供居所的租值',
        self_residence: '本人-獲僱主或相聯公司提供居所的租值',
        spouse_residence: '配偶-獲僱主或相聯公司提供居所的租值',

        oe: '支出及開支',
        self_oe: '本人-支出及開支',
        spouse_oe: '配偶-支出及開支',

        eduexp: '個人進修開支',
        self_eduexp: '本人-個人進修開支',
        spouse_eduexp: '配偶-個人進修開支',

        donation: '認可慈善捐款',
        self_donation: '本人-認可慈善捐款',
        spouse_donation: '配偶-認可慈善捐款',

        mpf: '課稅年度強積金供款', // 'MPF供款',
        self_mpf: '本人-MPF',
        spouse_mpf: '配偶-MPF',

        byBook: '購買考試書籍支出',
        byBook_self: '個人-購買考試書籍支出',
        byBook_sps: '配偶-購買考試書籍支出',

        homeloan: '居所貸款利息',
        self_homeloan: '本人-居所貸款利息',
        spouse_homeloan: '配偶-居所貸款利息',

        elderly: '在安老院居住的受養人數(收入需大於0)', // '在安老院居住的受養人數目',
        disabledep: '當中符合傷殘受養人免稅額人數', // '傷殘受養人免稅額資格的受養人數目',
        eldresi_amt: '支付給安老院的總開支', // '支付給安老院的開支款額',

        medic_insu: '醫療保險開支',
        self_medic_insu: '本人-醫療保險開支',
        spouse_medic_insu: '配偶-醫療保險開支',

        end: 0
      }
    }
  },
  computed: {
    STCOut1 () {
      return this.STCOut1_func(this.infin_update)
    }
  },
  watch: {
    CAbb: function (val) {
      this.D3OnChange()
      this.STCOut1_func(this.infin_update)
    },
    CAbb_DIS: function (val) {
      this.D4OnChange()
      this.STCOut1_func(this.infin_update)
    },
    NBbb: function (val) {
      this.D3aOnChange()
      this.STCOut1_func(this.infin_update)
    },
    NBbb_DIS: function (val) {
      this.D4aOnChange()
      this.STCOut1_func(this.infin_update)
    },
    brosis_dep: function (val) {
      this.D5OnChange()
      this.STCOut1_func(this.infin_update)
    },
    brosis_dep_DIS: function (val) {
      this.D6OnChange()
      this.STCOut1_func(this.infin_update)
    },
    resi_parent: function (val) {
      this.D7OnChange()
      this.STCOut1_func(this.infin_update)
    },
    resi_parent_DIS: function (val) {
      this.D8OnChange()
      this.STCOut1_func(this.infin_update)
    },
    non_resi_parent: function (val) {
      this.D9OnChange()
      this.STCOut1_func(this.infin_update)
    },
    non_resi_parent_DIS: function (val) {
      this.D10OnChange()
      this.STCOut1_func(this.infin_update)
    },
    slfIncome: function (val) {
      var vm = this
      this.T1OnBlur()
      // this.T13OnBlur()
      this.STCOut1_func(this.infin_update)
    },
    spsIncome: function (val) {
      this.T2OnBlur()
      // this.T14OnBlur()
      this.STCOut1_func(this.infin_update)
    },
    slfResi: function (val) {
      this.T1OnBlur()
      this.T13OnBlur()
      this.STCOut1_func(this.infin_update)
    },
    spsResi: function (val) {
      this.T2OnBlur()
      this.T14OnBlur()
      this.STCOut1_func(this.infin_update)
    },
    martial_status: function (val) {
      this.D2OnClick()
      this.STCOut1_func(this.infin_update)
    },
    slfMpf: function (val) {
      this.T11OnBlur()
      this.STCOut1_func(this.infin_update)
    },
    spsMpf: function (val) {
      this.T12OnBlur()
      this.STCOut1_func(this.infin_update)
    },
    slfBook: function (val) {
      this.BOOKT11OnBlur()
      this.STCOut1_func(this.infin_update)
    },
    spsBook: function (val) {
      this.BOOKT12OnBlur()
      this.STCOut1_func(this.infin_update)
    },
    slfDona: function (val) {
      if (val === 0 || isNaN(val)) {
        this.slfDona_restrict = 0
      }
      // this.Dona11OnBlur()
      this.STCOut1_func(this.infin_update)
    },
    spsDona: function (val) {
      if (val === 0 || isNaN(val)) {
        this.spsDona_restrict = 0
      }
      // this.Dona12OnBlur()
      this.STCOut1_func(this.infin_update)
    },
    slfSEE: function (val) {
      this.STCOut1_func(this.infin_update)
    },
    spsSEE: function (val) {
      this.STCOut1_func(this.infin_update)
    },
    slfLoan: function (val) {
      this.T7OnBlur()
      this.STCOut1_func(this.infin_update)
    },
    spsLoan: function (val) {
      this.T8OnBlur()
      this.STCOut1_func(this.infin_update)
    },
    slfERCE: function (val) {
      if (val === 0 || val === '0' || isNaN(val)) {
        this.slfERCE_forCompute = 0
      }
      this.SLFERCE11OnBlur()
      this.STCOut1_func(this.infin_update)
    },
    spsERCE: function (val) {
      if (val === 0 || val === '0' || isNaN(val)) {
        this.spsERCE_forCompute = 0
      }
      this.SPSERCE12OnBlur()
      this.STCOut1_func(this.infin_update)
    },
    spouse_disabled_dependent_DIS: function (val) {
      this.STCOut1_func(this.infin_update)
    },
    single_parent: function (val) {
      this.STCOut1_func(this.infin_update)
    },
    progress_1: function (val) {
      this.slider_slick()
    },
    slfMedInsu: function (val) { // onday_onday(2)
      this.slfMedInsuOnBlur()
      this.STCOut1_func(this.infin_update)
    },
    spsMedInsu: function (val) {
      this.spsMedInsuOnBlur()
      this.STCOut1_func(this.infin_update)
    },
    slfMedInsu_ppl: function (val) {
      this.slfMedInsuOnBlur()
      this.STCOut1_func(this.infin_update)
    },
    spsMedInsu_ppl: function (val) {
      this.spsMedInsuOnBlur()
      this.STCOut1_func(this.infin_update)
    },
    slfVolunMpf: function (val) {
      this.slfVolunMpfOnBlur()
      this.STCOut1_func(this.infin_update)
    },
    spsVolunMpf: function (val) {
      this.spsVolunMpfOnBlur()
      this.STCOut1_func(this.infin_update)
    },
    self_disabled_DIS: function (val) {
      this.STCOut1_func(this.infin_update)
    },
    sps_disabled_DIS: function (val) {
      this.STCOut1_func(this.infin_update)
    },
    self_iang_visa: function (val) {
      this.STCOut1_func(this.infin_update)
    },
    sps_iang_visa: function (val) {
      this.STCOut1_func(this.infin_update)
    },
    slfDiseaseExp: function (val) {
      this.slfDiseaseOnBlur()
      this.STCOut1_func(this.infin_update)
    },
    spsDiseaseExp: function (val) {
      this.spsDiseaseOnBlur()
      this.STCOut1_func(this.infin_update)
    }
  },
  methods: {
    toggleClass (var_name) {
      var vm = this
      vm[var_name] = !vm[var_name]
    },
    GA (have_to_pay, saved_pay) {
      var inputs = this.return_vm()
      inputs['have_to_pay'] = have_to_pay
      inputs['saved_pay'] = saved_pay
      var inputs_str = JSON.stringify(inputs)
      // console.log('GA: ', 'record_V1', 'martial-' + this.martial_status, inputs_str, 1)
      // this.$ga.event('record_V1', 'martial-' + this.martial_status, inputs_str, 1)
    },
    slick_afterchange () {
      var vm = this
      /*
      console.log('slick_afterchange')
      setTimeout(function () {
        vm.progress_1 = vm.$refs.slick.currentSlide()
      }, 200)
      */
    },
    slider_slick () {
      var vm = this
      console.log('slider_slick', vm.progress_1)
      vm.$refs.slick.goTo(vm.progress_1)
    },
    to_float (num) {
      return parseFloat(num).toFixed(2)
    },
    get_rate () {
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
    get_deduction () {
      var YrValue = '2018-2019'
      // parent.LSPYrEnd = YrValue
      // // //
      if (YrValue === '2018-2019') {
        this.LimD_DonaLL = 100
        this.LimD_DonaUL = 35
        this.LimD_Education = 100000
        this.LimD_HomeLoan = 100000
        this.LimD_Elderly = 100000 // 100000 MOCK 92000
        this.LimD_Elderly_new = 120000 // this.LimD_Elderly MOCK 120000
        this.LimD_MPF = 18000
        // 上限 fixed $18,000 ike MPF ( 必须有入息 )
        this.LimD_BOOK = 10000
        this.LimD_rate_MPF = 5
        this.LimP_rate_VAPRP = 10
        return true
      }
      return false
    },
    IsNumber (Istr) {
      var AllowChars, i
      AllowChars = '0123456789,.'
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
      // console.log('pp', parseInt(vm.CAbb_DIS, 10) > parseInt(vm.CAbb, 10))
      if (parseInt(vm.CAbb_DIS, 10) > parseInt(vm.CAbb, 10)) {
        vm.CAbb_DIS = parseInt(vm.CAbb, 10)
      }
      if (vm.AssessYear === '2018-2019') {
        if (parseInt(vm.CAbb, 10) + parseInt(vm.NBbb, 10) > 9) {
          // ErrMsgDDA2()
          // setTimeout(function () {
          vm.CAbb = 9 - parseInt(vm.NBbb, 10)
          // console.log('www3', vm.CAbb, parseInt(vm.NBbb, 10), (9 - parseInt(vm.NBbb, 10)))
          // }, 1)
        }
      }
    },
    D4OnChange () {
      var vm = this
      if (parseInt(vm.CAbb_DIS, 10) > 0) {
        if (parseInt(vm.CAbb_DIS, 10) > parseInt(vm.CAbb, 10)) {
          // ErrMsgDDA()
          setTimeout(function () {
            vm.CAbb_DIS = parseInt(vm.CAbb, 10)
          }, 1)
        }
      }
    },
    D3aOnChange () {
      var vm = this
      console.log('qq', parseInt(vm.NBbb_DIS, 10) > parseInt(vm.NBbb, 10))
      if (parseInt(vm.NBbb_DIS, 10) > parseInt(vm.NBbb, 10)) {
        vm.NBbb_DIS = parseInt(vm.NBbb, 10)
      }
      if (parseInt(vm.CAbb, 10) + parseInt(vm.NBbb, 10) > 9) {
        // ErrMsgDDA2()
        setTimeout(function () {
          vm.NBbb = 9 - parseInt(vm.CAbb, 10)
        }, 1)
      }
    },
    D4aOnChange () {
      var vm = this
      if (parseInt(vm.NBbb_DIS, 10) > 0) {
        if (parseInt(vm.NBbb_DIS, 10) > parseInt(vm.NBbb, 10)) {
          // ErrMsgDDA()
          setTimeout(function () {
            vm.NBbb_DIS = parseInt(vm.NBbb, 10)
          }, 1)
        }
      }
    },
    D5OnChange () {
      var vm = this
      var Num
      Num = parseFloat(vm.brosis_dep)
      if (Num > 0) {
        if (!vm.CheckYear(1997)) {
          setTimeout(function () {
            vm.brosis_dep = 0
          }, 1)
          Num = 0
        }
      }
      if (parseFloat(vm.brosis_dep_DIS) > Num) {
        vm.brosis_dep_DIS = Num
      }
    },
    D6OnChange () {
      var vm = this
      if (parseFloat(vm.brosis_dep_DIS) > 0) {
        if (!vm.CheckYear(1997)) {
          setTimeout(function () {
            vm.brosis_dep_DIS = 0
          }, 1)
        } else if (parseFloat(vm.brosis_dep_DIS) > parseFloat(vm.brosis_dep)) {
          // ErrMsgDDA()
          setTimeout(function () {
            vm.brosis_dep_DIS = parseFloat(vm.brosis_dep)
          }, 1)
        }
      }
    },
    D7OnChange () {
      var vm = this
      if (parseFloat(vm.resi_parent_DIS) > parseFloat(vm.resi_parent)) {
        vm.resi_parent_DIS = parseFloat(vm.resi_parent)
      }
    },
    D8OnChange () {
      var vm = this
      if (parseFloat(vm.resi_parent_DIS) > 0) {
        if (!vm.CheckYear(1996)) {
          setTimeout(function () {
            vm.resi_parent_DIS = 0
          }, 1)
        } else if (parseFloat(vm.resi_parent_DIS) > parseFloat(vm.resi_parent)) {
          // ErrMsgDDA()
          setTimeout(function () {
            vm.resi_parent_DIS = parseFloat(vm.resi_parent)
          }, 1)
        }
      }
    },
    D9OnChange () {
      var vm = this
      if (parseFloat(vm.non_resi_parent_DIS) > parseFloat(vm.non_resi_parent)) {
        vm.non_resi_parent_DIS = parseFloat(vm.non_resi_parent)
      }
    },
    D10OnChange () {
      var vm = this
      if (parseFloat(vm.non_resi_parent_DIS) > 0) {
        if (!vm.CheckYear(1996)) {
          setTimeout(function () {
            vm.non_resi_parent_DIS = 0
          }, 1)
        } else if (parseFloat(vm.non_resi_parent_DIS) > parseFloat(vm.non_resi_parent)) {
          // ErrMsgDDA()
          setTimeout(function () {
            vm.non_resi_parent_DIS = parseFloat(vm.non_resi_parent)
          }, 1)
        }
      }
    },
    T1OnBlur () {
      var vm = this
      var Income, ValueResidence, MustReset
      MustReset = false
      Income = vm.FormatInput(vm.slfIncome, 0, 999999999)
      if (Income === '*') {
        // ErrMsg('你輸入的數值不正確 !')
        MustReset = true
        vm.slfIncome = 0
        Income = 0
      } else if (Income === '+') {
        // ErrMsg('你不可輸入超過 9 位數字的數值 !')
        MustReset = true
        vm.slfIncome = 999999999
        Income = 999999999
      }
      // if (MustReset) {
      //   Income = ''
      // }
      if (Income === '0') {
        vm.spouse_disabled_dependent_DIS = false // '' + 0
        vm.slfResi = '0'
      }
      vm.slfIncome = Income
      if (Income !== '') {
        ValueResidence = vm.FormatInput(vm.slfResi, 0, 999999999)
        // console.log('t1a', Income, ValueResidence, CDbl(vm.slfResi), ((vm.LimP_rate_VAPRP / 100) * CDbl(vm.slfIncome)), vm.LimP_rate_VAPRP, CDbl(vm.slfIncome))
        if (ValueResidence !== '') {
          if (CDbl(vm.slfResi) > ((vm.LimP_rate_VAPRP / 100) * CDbl(vm.slfIncome))) {
            console.log('t1b', Income)
            // ErrMsg('你輸入港元' + ValueResidence + '。獲提供居所的租值不可超過你入息的' + vm.LimP_rate_VAPRP + '％。')
            // vm.slfResi = '0'
            vm.slfResi = '' + ((vm.LimP_rate_VAPRP / 100) * CDbl(vm.slfIncome))
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
      Income = vm.FormatInput(vm.spsIncome, 0, 999999999)
      if (vm.martial_status === 'S' && Income !== '0') {
        // ErrMsg('由於你並非已婚人士，因此你不能輸入配偶的入息。')
        MustReset = true
        vm.spsIncome = 0
        Income = 0
      } else if (Income === '*') {
        // ErrMsg('你輸入的數值不正確 !')
        MustReset = true
        vm.spsIncome = 0
        Income = 0
      } else if (Income === '+') {
        // ErrMsg('你不可輸入超過 9 位數字的數值 !')
        MustReset = true
        vm.spsIncome = 999999999
        Income = 999999999
      }
      // if (MustReset) {
      //   Income = ''
      //   // vm.spsIncome.focus()
      // }
      if (Income === '0') {
        vm.spsResi = '0'
      }
      vm.spsIncome = Income
      if (Income !== '') {
        ValueResidence = vm.FormatInput(vm.spsResi, 0, 999999999)
        if (ValueResidence !== '') {
          if (CDbl(vm.spsResi) > ((vm.LimP_rate_VAPRP / 100) * CDbl(vm.spsIncome))) {
            // ErrMsg('你輸入港元' + ValueResidence + '。獲提供居所的租值不可超過你入息的' + vm.LimP_rate_VAPRP + '％。')
            // vm.spsResi = '0'
            vm.spsResi = ((vm.LimP_rate_VAPRP / 100) * CDbl(vm.spsIncome))
            // dF.T14.focus()
          }
        }
        vm.spic = (Income !== vm.oT2)
        vm.oT2 = Income
        vm.ChkDD(0)
      }
    },
    T7OnBlur () {
      var vm = this
      var Income, obj, MustReset, ValueResidence
      MustReset = false
      Income = vm.FormatInput(vm.slfLoan, 0, vm.LimD_HomeLoan)
      if (Income === '*') {
        // ErrMsg('你輸入的數值不正確 !')
        MustReset = true
        vm.slfLoan = 0
        Income = 0
      } else if (Income === '+') {
        // ErrMsg('你不可輸入超過 9 位數字的數值 !')
        MustReset = true
        vm.slfLoan = vm.LimD_HomeLoan
        Income = vm.LimD_HomeLoan
      }
      vm.slfLoan = Income
      vm.ChkDD(7)
    },
    T8OnBlur () {
      var vm = this
      var Income, obj, MustReset, ValueResidence
      MustReset = false
      Income = vm.FormatInput(vm.spsLoan, 0, vm.LimD_HomeLoan)
      if (vm.martial_status === 'S' && Income !== '0') {
        // ErrMsg('由於你並非已婚人士，因此你不能輸入配偶的入息。')
        MustReset = true
        vm.spsLoan = 0
        Income = 0
      } else if (Income === '*') {
        // ErrMsg('你輸入的數值不正確 !')
        MustReset = true
        vm.spsLoan = 0
        Income = 0
      } else if (Income === '+') {
        // ErrMsg('你不可輸入超過 9 位數字的數值 !')
        MustReset = true
        vm.spsLoan = vm.LimD_HomeLoan
        Income = vm.LimD_HomeLoan
      }
      vm.spsLoan = Income
      vm.ChkDD(8)
    },
    T11OnBlur () {
      var vm = this
      var Income, obj, MustReset, ValueResidence
      MustReset = false
      Income = vm.FormatInput(vm.slfMpf, 0, vm.LimD_MPF)
      if (Income === '*') {
        // ErrMsg('你輸入的數值不正確 !')
        MustReset = true
        // vm.slfMpf = 0
        Income = 0
      } else if (Income === '+') {
        // ErrMsg('你不可輸入超過 9 位數字的數值 !')
        MustReset = true
        vm.slfMpf = vm.LimD_MPF
        Income = vm.LimD_MPF
      }
      vm.slfMpf = Income
      // vm.ChkDD(7)
    },
    T12OnBlur () {
      var vm = this
      var Income, obj, MustReset, ValueResidence
      MustReset = false
      Income = vm.FormatInput(vm.spsMpf, 0, vm.LimD_MPF)
      if (vm.martial_status === 'S' && Income !== '0') {
        // ErrMsg('由於你並非已婚人士，因此你不能輸入配偶的入息。')
        MustReset = true
        // vm.spsMpf = 0
        Income = 0
      } else if (Income === '*') {
        // ErrMsg('你輸入的數值不正確 !')
        MustReset = true
        vm.spsMpf = 0
        Income = 0
      } else if (Income === '+') {
        // ErrMsg('你不可輸入超過 9 位數字的數值 !')
        MustReset = true
        vm.spsMpf = vm.LimD_MPF
        Income = vm.LimD_MPF
      }
      vm.spsMpf = Income
      // vm.ChkDD(8)
    },
    BOOKT11OnBlur () {
      var vm = this
      var Income, obj, MustReset, ValueResidence
      MustReset = false
      Income = vm.FormatInput(vm.slfBook, 0, vm.LimD_BOOK)
      if (Income === '*') {
        // ErrMsg('你輸入的數值不正確 !')
        MustReset = true
        // vm.slfMpf = 0
        Income = 0
      } else if (Income === '+') {
        // ErrMsg('你不可輸入超過 9 位數字的數值 !')
        MustReset = true
        vm.slfBook = vm.LimD_BOOK
        Income = vm.LimD_BOOK
      }
      vm.slfBook = Income
      // vm.ChkDD(7)
    },
    BOOKT12OnBlur () {
      console.log('ui update')
      var vm = this
      var Income, obj, MustReset, ValueResidence
      MustReset = false
      Income = vm.FormatInput(vm.spsBook, 0, vm.LimD_BOOK)
      if (Income === '*') {
        // ErrMsg('你輸入的數值不正確 !')
        MustReset = true
        // vm.spsBook = 0
        Income = 0
      } else if (Income === '+') {
        // ErrMsg('你不可輸入超過 9 位數字的數值 !')
        MustReset = true
        vm.spsBook = vm.LimD_BOOK
        Income = vm.LimD_BOOK
      }
      vm.spsBook = Income
      // vm.ChkDD(8)
    },
    SLFERCE11OnBlur () {
      var vm = this
      var Income, obj, MustReset, ValueResidence
      MustReset = false
      Income = vm.FormatInput(vm.slfERCE, 0, vm.LimD_Elderly)
      if (Income === '*') {
        // ErrMsg('你輸入的數值不正確 !')
        MustReset = true
        // vm.slfMpf = 0
        Income = 0
      } else if (Income === '+') {
        // ErrMsg('你不可輸入超過 9 位數字的數值 !')
        MustReset = true
        vm.slfERCE = vm.LimD_Elderly
        Income = vm.LimD_Elderly
      }
      vm.slfERCE = Income
      // vm.ChkDD(7)
    },
    SPSERCE12OnBlur () {
      var vm = this
      var Income, obj, MustReset, ValueResidence
      MustReset = false
      Income = vm.FormatInput(vm.spsERCE, 0, vm.LimD_Elderly)
      if (Income === '*') {
        // ErrMsg('你輸入的數值不正確 !')
        MustReset = true
        // vm.spsBook = 0
        Income = 0
      } else if (Income === '+') {
        // ErrMsg('你不可輸入超過 9 位數字的數值 !')
        MustReset = true
        vm.spsERCE = vm.LimD_Elderly
        Income = vm.LimD_Elderly
      }
      vm.spsERCE = Income
      // vm.ChkDD(8)
    },
    Dona11OnBlur () {
      var vm = this
      var Income, obj, MustReset, ValueResidence
      MustReset = false
      Income = vm.FormatInput(vm.slfDona, 0, Math.floor(vm.LimD_DonaUL * (CDbl(vm.slfIncome) + CDbl(vm.slfResi) - CDbl(vm.slfOE)) / 100))
      if (Income === '*') {
        // ErrMsg('你輸入的數值不正確 !')
        MustReset = true
        // vm.slfMpf = 0
        Income = 0
      } else if (Income === '+') {
        // ErrMsg('你不可輸入超過 9 位數字的數值 !')
        MustReset = true
        vm.slfDona = Math.floor(vm.LimD_DonaUL * (CDbl(vm.slfIncome) + CDbl(vm.slfResi) - CDbl(vm.slfOE)) / 100)
        Income = Math.floor(vm.LimD_DonaUL * (CDbl(vm.slfIncome) + CDbl(vm.slfResi) - CDbl(vm.slfOE)) / 100)
      }
      vm.slfDona = Income
      vm.ChkDD(7)
    },
    Dona12OnBlur () {
      var vm = this
      var Income, obj, MustReset, ValueResidence
      MustReset = false
      Income = vm.FormatInput(vm.spsDona, 0, Math.floor(vm.LimD_DonaUL * (CDbl(vm.spsIncome) + CDbl(vm.spsResi) - CDbl(vm.spsOE)) / 100))
      if (vm.martial_status === 'S' && Income !== '0') {
        // ErrMsg('由於你並非已婚人士，因此你不能輸入配偶的入息。')
        MustReset = true
        // vm.spsMpf = 0
        Income = 0
      } else if (Income === '*') {
        // ErrMsg('你輸入的數值不正確 !')
        MustReset = true
        // vm.spsBook = 0
        Income = 0
      } else if (Income === '+') {
        // ErrMsg('你不可輸入超過 9 位數字的數值 !')
        MustReset = true
        vm.spsDona = Math.floor(vm.LimD_DonaUL * (CDbl(vm.spsIncome) + CDbl(vm.spsResi) - CDbl(vm.spsOE)) / 100)
        Income = Math.floor(vm.LimD_DonaUL * (CDbl(vm.spsIncome) + CDbl(vm.spsResi) - CDbl(vm.spsOE)) / 100)
      }
      vm.spsDona = Income
      vm.ChkDD(8)
    },
    T13OnBlur () {
      var vm = this
      var Income, MustReset, ValueResidence
      MustReset = false
      Income = vm.FormatInput(vm.slfIncome, 0, 999999999)
      ValueResidence = vm.FormatInput(vm.slfResi, 0, 999999999)
      if (ValueResidence === '*') {
        // ErrMsg('你輸入的數值不正確 !')
        MustReset = true
      } else if (ValueResidence === '+') {
        // ErrMsg('你不可輸入超過 9 位數字的數值 !')
        MustReset = true
      } else if (CDbl(vm.slfResi) > ((vm.LimP_rate_VAPRP / 100) * CDbl(vm.slfIncome))) {
        // ErrMsg('你輸入港元' + ValueResidence + '。獲提供居所的租值不可超過你入息的' + vm.LimP_rate_VAPRP + '％。')
        MustReset = true
      }
      if (MustReset) {
        ValueResidence = ''
        // dF.T13.focus()
      }
      vm.slfResi = ValueResidence
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
      Income = vm.FormatInput(vm.spsIncome, 0, 999999999)
      ValueResidence = vm.FormatInput(vm.spsResi, 0, 999999999)
      if (vm.martial_status === 'S' && ValueResidence !== '0') {
        // ErrMsg('由於你並非已婚人士，因此你不能輸入配偶的獲提供居所的租值。')
        MustReset = true
      } else if (ValueResidence === '*') {
        // ErrMsg('你輸入的數值不正確 !')
        MustReset = true
      } else if (ValueResidence === '+') {
        // ErrMsg('你不可輸入超過 9 位數字的數值 !')
        MustReset = true
      } else if (CDbl(vm.spsResi) > ((vm.LimP_rate_VAPRP / 100) * CDbl(vm.spsIncome))) {
        // ErrMsg('你輸入港元' + ValueResidence + '。獲提供居所的租值不可超過你入息的' + vm.LimP_rate_VAPRP + '％。')
        MustReset = true
      }
      if (MustReset) {
        ValueResidence = ''
        // dF.T14.focus()
      }
      vm.spsResi = ValueResidence
      if (ValueResidence !== '') {
        vm.spvr = (ValueResidence !== vm.oT14)
        vm.oT14 = ValueResidence
        vm.ChkDD(0)
      }
    },
    slfMedInsuOnBlur () { // onday_onday(3)
      var vm = this
      var Income, obj, MustReset, ValueResidence
      var Limit = 8000
      Income = vm.FormatInput(vm.slfMedInsu, 0, Limit * vm.slfMedInsu_ppl)
      if (Income === '*') {
        // ErrMsg('你輸入的數值不正確 !')
        MustReset = true
        vm.slfMedInsu = 0
        Income = 0
      } else if (Income === '+') {
        MustReset = true
        vm.slfMedInsu = Limit * vm.slfMedInsu_ppl
        Income = Limit * vm.slfMedInsu_ppl
      }
      vm.slfMedInsu = Income
      vm.ChkDD(0)
    },
    spsMedInsuOnBlur () {
      var vm = this
      var Income, obj, MustReset, ValueResidence
      var Limit = 8000
      Income = vm.FormatInput(vm.spsMedInsu, 0, Limit * vm.spsMedInsu_ppl)
      if (Income === '*') {
        // ErrMsg('你輸入的數值不正確 !')
        MustReset = true
        vm.spsMedInsu = 0
        Income = 0
      } else if (Income === '+') {
        MustReset = true
        vm.spsMedInsu = Limit * vm.spsMedInsu_ppl
        Income = Limit * vm.spsMedInsu_ppl
      }
      vm.spsMedInsu = Income
      vm.ChkDD(0)
    },
    slfVolunMpfOnBlur () { // onday_onday(7)
      var vm = this
      var Income, obj, MustReset, ValueResidence
      var Limit = 60000

      var slfVolunMpf = parseFloat(vm.slfVolunMpf)
      var spsVolunMpf = parseFloat(vm.spsVolunMpf)
      console.log(`---`, slfVolunMpf + spsVolunMpf)

      // if (vm.martial_status === 'M') { // Married ?
      //   if (slfVolunMpf + spsVolunMpf > Limit * 2) {
      //     slfVolunMpf = Limit * 2 - spsVolunMpf
      //     spsVolunMpf = spsVolunMpf + 0
      //   } else {
      //     slfVolunMpf = slfVolunMpf + 0
      //   }
      // } else {
      if (slfVolunMpf > 60000) {
        slfVolunMpf = 60000
      }
      // }
      Income = vm.FormatInput(slfVolunMpf, 0, 99999999)
      if (Income === '*') {
        // ErrMsg('你輸入的數值不正確 !')
        MustReset = true
        vm.slfVolunMpf = 0
        Income = 0
      } else if (Income === '+') {
        MustReset = true
        vm.slfVolunMpf = Limit
        Income = Limit
      }
      console.log(Income)
      vm.slfVolunMpf = Income
      vm.ChkDD(0)
    },
    spsVolunMpfOnBlur () { // onday_onday(7)
      var vm = this
      var Income, obj, MustReset, ValueResidence
      var Limit = 60000

      var slfVolunMpf = parseFloat(vm.slfVolunMpf)
      var spsVolunMpf = parseFloat(vm.spsVolunMpf)

      // if (vm.martial_status === 'M') { // Married ?
      //   if (slfVolunMpf + spsVolunMpf > Limit * 2) {
      //     spsVolunMpf = Limit * 2 - slfVolunMpf
      //     slfVolunMpf = slfVolunMpf + 0
      //   } else {
      //     spsVolunMpf = spsVolunMpf + 0
      //   }
      // } else {
      if (spsVolunMpf > 60000) {
        spsVolunMpf = 60000
      }
      // }
      Income = vm.FormatInput(spsVolunMpf, 0, 99999999)
      if (Income === '*') {
        // ErrMsg('你輸入的數值不正確 !')
        MustReset = true
        vm.spsVolunMpf = 0
        Income = 0
      } else if (Income === '+') {
        MustReset = true
        vm.spsVolunMpf = Limit
        Income = Limit
      }
      console.log(Income)
      vm.spsVolunMpf = Income
      vm.ChkDD(0)
    },
    slfDiseaseOnBlur () {
      var vm = this
      var Income, obj, MustReset, ValueResidence
      var Limit = 60000

      var slfDisease = parseFloat(vm.slfDiseaseExp)
      console.log(`---slfDisease expense`, slfDisease)
      // var uperLim = Math.floor(CDbl(vm.slfIncome) / 1000)

      if (slfDisease > 60000) {
        slfDisease = 60000
      }
      Income = vm.FormatInput(slfDisease, 0, 99999999)
      if (Income === '*') {
        // ErrMsg('你輸入的數值不正確 !')
        MustReset = true
        vm.slfDiseaseExp = 0
        Income = 0
      } else if (Income === '+') {
        MustReset = true
        vm.slfDiseaseExp = Limit
        Income = Limit
      }
      console.log(Income)
      vm.slfDiseaseExp = Income
      vm.ChkDD(0)
    },
    spsDiseaseOnBlur () {
      var vm = this
      var Income, obj, MustReset, ValueResidence
      var Limit = 60000

      var spsDisease = parseFloat(vm.spsDiseaseExp)
      console.log(`---slfDisease expense`, spsDisease)

      if (spsDisease > 60000) {
        spsDisease = 60000
      }
      Income = vm.FormatInput(spsDisease, 0, 99999999)
      if (Income === '*') {
        // ErrMsg('你輸入的數值不正確 !')
        MustReset = true
        vm.spsDiseaseExp = 0
        Income = 0
      } else if (Income === '+') {
        MustReset = true
        vm.spsDiseaseExp = Limit
        Income = Limit
      }
      console.log(Income)
      vm.spsDiseaseExp = Income
      vm.ChkDD(0)
    },
    self_disabled_DISOnBlur () {
      //
    },
    ChkDD (X) {
      var vm = this
      var MsgID, iv, lv, uv, a, b, v1, vc
      var obj, i
      var slfDDreseted, spsDDreseted
      var spsHasIncome, slfACDChanged, spsACDChanged
      spsHasIncome = (NotNIL(vm.spsIncome))
      MsgID = 0
      slfDDreseted = false
      spsDDreseted = false
      // console.log('ChkDDa', spsHasIncome)
      if (IsNIL(vm.slfIncome) && spsHasIncome) {
        if (NotNIL(vm.slfDona) || NotNIL(vm.slfDona_restrict) || NotNIL(vm.slfERCE) || NotNIL(vm.slfERCE_forCompute) || vm.slfElder > 0 || vm.slfDisdep > 0) {
          ClrTxt(vm.slfDona)
          console.log('ClrTxt(')
          ClrTxt(vm.slfDona_restrict)
          console.log('ClrTxt(')
          ClrTxt(vm.slfERCE)
          console.log('ClrTxt(')
          ClrTxt(vm.slfERCE_forCompute)
          console.log('ClrTxt(')
          vm.slfElder = 0
          vm.slfDisdep = 0
          MsgID = 2.8
          slfDDreseted = true
        }
        vm.oT3 = ''
        vm.T3tag = '0'
        vm.oT11 = ''
        vm.T11tag = '0'
      }
      if (IsNIL(vm.slfIncome)) {
        if (NotNIL(vm.slfDona) || NotNIL(vm.slfDona_restrict) || NotNIL(vm.slfSEE) || NotNIL(vm.slfERCE) || NotNIL(vm.slfERCE_forCompute) || NotNIL(vm.slfMpf) || vm.slfElder > 0 || vm.slfDisdep > 0 || NotNIL(vm.slfOE)) {
          ClrTxt(vm.slfDona)
          console.log('ClrTxt(')
          ClrTxt(vm.slfDona_restrict)
          console.log('ClrTxt(')
          ClrTxt(vm.slfSEE)
          console.log('ClrTxt(')
          ClrTxt(vm.slfERCE)
          console.log('ClrTxt(')
          ClrTxt(vm.slfERCE_forCompute)
          console.log('ClrTxt(')
          vm.slfElder = 0
          vm.slfDisdep = 0
          ClrTxt(vm.slfMpf)
          console.log('ClrTxt(')
          // MOCK BOOK
          ClrTxt(vm.slfBook)
          console.log('ClrTxt(')
          ClrTxt(vm.slfOE)
          console.log('ClrTxt(')
          MsgID = 2
          slfDDreseted = true
        }
        vm.oT3 = ''
        vm.T3tag = '0'
        vm.oT11 = ''
        vm.T11tag = '0'
      }
      if (IsNIL(vm.spsIncome)) {
        if (NotNIL(vm.spsDona) || NotNIL(vm.spsDona_restrict) || NotNIL(vm.spsSEE) || NotNIL(vm.spsERCE) || NotNIL(vm.spsERCE_forCompute) || NotNIL(vm.spsLoan) || vm.spsElder > 0 || vm.spsDisdep > 0 || NotNIL(vm.spsOE)) {
          ClrTxt(vm.spsDona)
          console.log('ClrTxt(')
          ClrTxt(vm.spsDona_restrict)
          console.log('ClrTxt(')
          ClrTxt(vm.spsSEE)
          console.log('ClrTxt(')
          ClrTxt(vm.spsERCE)
          console.log('ClrTxt(')
          ClrTxt(vm.spsERCE_forCompute)
          console.log('ClrTxt(')
          vm.spsElder = 0
          vm.spsDisdep = 0
          ClrTxt(vm.spsLoan)
          console.log('ClrTxt(')
          ClrTxt(vm.spsOE)
          console.log('ClrTxt(')
          if (vm.martial_status === 'S') { // Single ?
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
      vc = (vm.slfDona !== vm.oT3)
      if ((X === 3 && vc) || NotNIL(vm.slfDona)) {
        lv = vm.LimD_DonaLL
        if (IsNIL(vm.slfIncome)) {
          uv = 0
        } else {
          uv = Math.floor(vm.LimD_DonaUL * (CDbl(vm.slfIncome) + CDbl(vm.slfResi) - CDbl(vm.slfOE)) / 100)
        }
        vm.oT3 = ''
        if (vc) vm.T3tag = '0'
        if (NotNIL(vm.slfDona)) {
          iv = vm.FormatInput(vm.slfDona, lv, uv)
          a = vm.FormatInput(vm.slfDona, 0, 99999999999)
          v1 = '0'
          if (iv === '*') {
            MsgID = 1
          } else if (iv === '-') {
            vm.slfDona_restrict = SetTxt(vm.slfDona_restrict, 0)
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
          if (parseFloat(vm.slfDona) < lv) {
            // NOP: wait for input larger
            vm.slfDona_restrict = SetTxt(vm.slfDona_restrict, 0)
          } else {
            vm.slfDona = SetTxt(vm.slfDona, v1)
            vm.slfDona_restrict = SetTxt(vm.slfDona_restrict, v1)
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
      vc = (vm.spsDona !== vm.oT4)
      if ((X === 4 && vc) || NotNIL(vm.spsDona)) {
        lv = vm.LimD_DonaLL
        if (IsNIL(vm.spsIncome)) {
          uv = 0
        } else {
          uv = Math.floor(vm.LimD_DonaUL * (CDbl(vm.spsIncome) + CDbl(vm.spsResi) - CDbl(vm.spsOE)) / 100)
        }
        vm.oT4 = ''
        if (vc) vm.T4tag = '0'
        if (NotNIL(vm.spsDona)) {
          iv = vm.FormatInput(vm.spsDona, lv, uv)
          a = vm.FormatInput(vm.spsDona, 0, 99999999999)
          v1 = '0'
          if (iv === '*') {
            MsgID = 1
          } else if (iv === '-') {
            vm.spsDona_restrict = SetTxt(vm.spsDona_restrict, 0)
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
          if (parseFloat(vm.spsDona) < lv) {
            vm.spsDona_restrict = SetTxt(vm.spsDona_restrict, 0)
            // NOP: wait for input larger
          } else {
            vm.spsDona = SetTxt(vm.spsDona, v1)
            vm.spsDona_restrict = SetTxt(vm.spsDona_restrict, v1)
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
      if (NotNIL(vm.slfSEE)) {
        iv = vm.FormatInput(vm.slfSEE, 0, vm.LimD_Education)
        a = vm.FormatInput(vm.slfSEE, 0, 99999999999)
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
        console.log('slfSEE', vm.slfSEE, v1, iv, vm.LimD_Education)
        vm.slfSEE = SetTxt(vm.slfSEE, v1)
      }
      if (NotNIL(vm.spsSEE)) {
        iv = vm.FormatInput(vm.spsSEE, 0, vm.LimD_Education)
        a = vm.FormatInput(vm.spsSEE, 0, 99999999999)
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
        vm.spsSEE = SetTxt(vm.spsSEE, v1)
      }
      if (NotNIL(vm.slfLoan)) {
        iv = vm.FormatInput(vm.slfLoan, 0, vm.LimD_HomeLoan)
        a = vm.FormatInput(vm.slfLoan, 0, 99999999999)
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
        vm.slfLoan = SetTxt(vm.slfLoan, v1)
      }
      if (NotNIL(vm.spsLoan)) {
        if (vm.martial_status === 'S') { // Single ?
          MsgID = 4
          ClrTxt(vm.spsLoan)
          console.log('ClrTxt(')
        } else {
          iv = vm.FormatInput(vm.spsLoan, 0, vm.LimD_HomeLoan)
          a = vm.FormatInput(vm.spsLoan, 0, 99999999999)
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
          vm.spsLoan = SetTxt(vm.spsLoan, v1)
        }
      }
      if (NotNIL(vm.slfERCE)) {
        iv = vm.FormatInput(vm.slfERCE, 0, vm.LimD_Elderly * vm.slfElder)
        var iv2 = vm.FormatInput(vm.slfERCE, 0, vm.LimD_Elderly_new * vm.slfElder)
        if (iv === '+') {
          vm.slfERCE_forCompute = vm.LimD_Elderly * vm.slfElder
        } else {
          vm.slfERCE_forCompute = iv
        }
        a = vm.FormatInput(vm.slfERCE, 0, 99999999999)
        v1 = '0'
        if (vm.YrEnd < 1999 && iv2 !== '0') {
          MsgID = 3
          b = 1999
        } else if (iv2 === '*') {
          MsgID = 1
        } else if (iv2 === '+') {
          MsgID = 9
          b = a
          v1 = FormatMoney(vm.LimD_Elderly_new * vm.slfElder)
        } else {
          v1 = iv2
        }
        vm.slfERCE = SetTxt(vm.slfERCE, v1)
      }
      if (NotNIL(vm.spsERCE)) {
        iv = vm.FormatInput(vm.spsERCE, 0, vm.LimD_Elderly * vm.spsElder)
        iv2 = vm.FormatInput(vm.spsERCE, 0, vm.LimD_Elderly_new * vm.spsElder)
        if (iv === '+') {
          vm.spsERCE_forCompute = vm.LimD_Elderly * vm.spsElder
        } else {
          vm.spsERCE_forCompute = iv
        }
        a = vm.FormatInput(vm.spsERCE, 0, 99999999999)
        v1 = '0'
        if (vm.YrEnd < 1999 && iv2 !== '0') {
          MsgID = 3
          b = 1999
        } else if (iv2 === '*') {
          MsgID = 1
        } else if (iv2 === '+') {
          MsgID = 9
          b = a
          v1 = FormatMoney(vm.LimD_Elderly_new * vm.spsElder)
        } else {
          v1 = iv2
        }
        vm.spsERCE = SetTxt(vm.spsERCE, v1)
      }
      vc = (vm.slfMpf !== vm.oT11)
      if ((X === 11 && vc) || NotNIL(vm.slfMpf)) {
        if (IsNIL(vm.slfIncome)) {
          uv = 0
        } else {
          uv = vm.LimD_MPF
        }
        vm.oT11 = ''
        if (vc) vm.T11tag = '0'
        if (NotNIL(vm.slfMpf)) {
          iv = vm.FormatInput(vm.slfMpf, 0, uv)
          a = vm.FormatInput(vm.slfMpf, 0, 99999999999)
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
          // console.log('slfMpf', vm.slfMpf, v1, uv)
          vm.slfMpf = SetTxt(vm.slfMpf, v1)
        }
      }
      vc = (vm.spsMpf !== vm.oT12)
      if ((X === 12 && vc) || NotNIL(vm.spsMpf)) {
        if (IsNIL(vm.spsIncome)) {
          uv = 0
        } else {
          uv = Math.floor(vm.LimD_rate_MPF * CDbl(vm.spsIncome) / 100) // limit by percentage of income
          uv = vm.LimD_MPF
        }
        vm.oT12 = ''
        if (vc) vm.T12tag = '0'
        if (NotNIL(vm.spsMpf)) {
          iv = vm.FormatInput(vm.spsMpf, 0, uv)
          a = vm.FormatInput(vm.spsMpf, 0, 99999999999)
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
          // console.log('spsMpf', vm.spsMpf, v1, iv, uv)
          vm.spsMpf = SetTxt(vm.spsMpf, v1)
        }
      }
      if (NotNIL(vm.slfOE)) {
        if (IsNIL(vm.slfIncome)) {
          iv = 0
        } else {
          iv = vm.FormatInput(vm.slfOE, 0, 999999999)
        }
        if (iv === '*') {
          MsgID = 1
          v1 = 0
        } else if (iv === '+') {
          MsgID = 1.5
          v1 = vm.slfOE_CAP
        } else {
          v1 = iv
        }
        console.log('slfOE', vm.slfOE, v1, iv, vm.slfOE_CAP)
        vm.slfOE = SetTxt(vm.slfOE, v1)
      }
      // console.log('spsOE', vm.spsIncome, vm.spsOE, v1, iv)
      if (NotNIL(vm.spsOE)) {
        if (IsNIL(vm.spsIncome)) {
          iv = 0
        } else {
          iv = vm.FormatInput(vm.spsOE, 0, 999999999)
        }
        if (iv === '*') {
          MsgID = 1
          v1 = 0
        } else if (iv === '+') {
          MsgID = 1.5
          v1 = vm.spsOE_CAP
        } else {
          v1 = iv
        }
        console.log('spsOE', vm.spsOE, v1, iv, vm.spsOE_CAP)
        vm.spsOE = SetTxt(vm.spsOE, v1)
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
        if (X === 3) NullZero(vm.slfDona, MsgID)
        else if (X === 4) NullZero(vm.spsDona, MsgID)
        else if (X === 5) NullZero(vm.slfSEE, MsgID)
        else if (X === 6) NullZero(vm.spsSEE, MsgID)
        else if (X === 7) NullZero(vm.slfLoan, MsgID)
        else if (X === 8) NullZero(vm.spsLoan, MsgID)
        else if (X === 9) NullZero(vm.slfERCE, MsgID)
        else if (X === 10) NullZero(vm.spsERCE, MsgID)
        else if (X === 11) NullZero(vm.slfMpf, MsgID)
        else if (X === 12) NullZero(vm.spsMpf, MsgID)
        else if (X === 15) NullZero(vm.slfOE, MsgID)
        else if (X === 16) NullZero(vm.spsOE, MsgID)
      } else { // ChkDD triggered by fields other than Deduction Inputs (such as Income or Assessment year)
        if (vm.slic || vm.slvr) {
          if (vm.slic && (CInt(vm.T3tag) > 0)) {
            slfACDChanged = true
          }
          vm.slic = false
          vm.slvr = false
          vc = false
          v1 = vm.slfDona
          if (v1 === '') v1 = '0'
          if (slfACDChanged) vc = true
          v1 = vm.slfMpf
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
          v1 = vm.spsDona
          if (v1 === '') v1 = '0'
          if (spsACDChanged) vc = true
          v1 = vm.spsLoan
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
        vm.CAbb_DIS = 0
        vm.resi_parent_DIS = 0
        vm.non_resi_parent_DIS = 0
        vm.spouse_disabled_dependent_DIS = false // '' + 0
      }
      if (vm.YrEnd < 1997) { // before 96/97
        vm.brosis_dep = 0
        vm.brosis_dep_DIS = 0
      }
      if (vm.YrEnd < 1999) { // before 98/99
        vm.slfElder = 0
        vm.spsElder = 0
        vm.slfDisdep = 0
        vm.spsDisdep = 0
      }
      if (vm.YrEnd < 2006) { // before 2005/06
        vm.resi_parent = 0
        vm.non_resi_parent = 0
      }
      this.get_deduction()
      vm.ChkDD(-1)
    },
    D2OnClick () {
      var vm = this
      if (vm.martial_status === 'S') { // Single ?
        vm.spsIncome = '0'
        vm.spsResi = '0'
        vm.spouse_disabled_dependent_DIS = false // '' + 0
      }
      if (vm.martial_status === 'M') { // Married ?
        vm.single_parent = false // '' + 0
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
    reset_form1 () {
      var vm = this
      vm.martial_status = 'S'
      vm.slfIncome = 0
      vm.spsIncome = 0
      vm.slfResi = 0
      vm.spsResi = 0
      vm.slfOE = 0
      vm.spsOE = 0
      vm.slfSEE = 0
      vm.spsSEE = 0
      vm.slfDona = 0
      vm.slfDona_restrict = 0
      vm.spsDona = 0
      vm.spsDona_restrict = 0
      vm.slfMpf = 0
      vm.spsMpf = 0
      // MOCK
      vm.slfBook = 0
      vm.spsBook = 0
      vm.slfLoan = 0
      vm.spsLoan = 0
      vm.slfElder = 0
      vm.slfDisdep = 0
      vm.slfERCE = 0
      vm.slfERCE_forCompute = 0
      vm.spsElder = 0
      vm.spsDisdep = 0
      vm.spsERCE = 0
      vm.spsERCE_forCompute = 0
      vm.slfRebateAmt = 0
      vm.NBbb = 0
      vm.CAbb = 0
      vm.single_parent = false
      vm.brosis_dep = 0
      vm.resi_parent = 0
      vm.non_resi_parent = 0
      vm.resi_parent_5560 = 0
      vm.non_resi_parent_5560 = 0
      vm.NBbb_DIS = 0
      vm.CAbb_DIS = 0
      vm.brosis_dep_DIS = 0
      vm.resi_parent_DIS = 0
      vm.non_resi_parent_DIS = 0
      vm.spouse_disabled_dependent_DIS = false

      vm.slfMedInsu = 0 // onday_onday(4)
      vm.spsMedInsu = 0
      vm.slfMedInsu_ppl = 0
      vm.spsMedInsu_ppl = 0
      vm.self_disabled_DIS = false
      vm.sps_disabled_DIS = false
      vm.self_iang_visa = false
      vm.sps_iang_visa = false
      vm.slfDiseaseExp = 0
      vm.spsDiseaseExp = 0
    },
    STCOut1_func () {
      // console.log('loop_count', this.infin_update)
      // if (this.infin_update < 10000) {
      //   this.infin_update++
      // } else {
      //   this.infin_update = 0
      //   return this.STCOut
      // }
      var tmp = 0
      var i = 0
      var self_DISABLE_deduct // onday_onday(new in 2018)
      var sps_DISABLE_deduct // onday_onday(new in 2018)
      // // MOCK
      // var self_iang_visa_deduct
      // var sps_iang_visa_deduct
      this.STCIn8 = false // 1: 有供養傷殘, 0: 沒有供養傷殘

      // INIT
      var STCOut = new Array(80)
      for (i = 0; i < 80; i++) {
        STCOut[i] = 0
      }

      // 入息
      this.slfIncome = parseFloat(this.slfIncome)
      this.spsIncome = parseFloat(this.spsIncome)
      this.slfNCI = this.slfIncome
      this.spsNCI = this.spsIncome
      if (this.slfNCI > 0) {
        STCOut[0] = parseFloat(this.slfNCI) + parseFloat(this.slfResi)
      } else {
        STCOut[0] = parseFloat(this.slfNCI)
        this.slfResi = 0
        this.slfSEE = 0
        this.slfOE = 0
        this.slfDona = 0
        this.slfDona_restrict = 0
        this.slfERCE = 0
        this.slfERCE_forCompute = 0
        this.slfMpf = 0
        // MOCK
        this.slfBook = 0
        this.slfDiseaseExp = 0
        this.slfLoan = 0
        // ErrMsg('由於你沒有入息，因此你不能扣除居所貸款利息。')
      }
      if (this.spsNCI > 0) {
        STCOut[1] = parseFloat(this.spsNCI) + parseFloat(this.spsResi)
      } else {
        STCOut[1] = parseFloat(this.spsNCI)
        this.spsResi = 0
        this.spsSEE = 0
        this.spsOE = 0
        this.spsDona = 0
        this.spsDona_restrict = 0
        this.spsERCE = 0
        this.spsERCE_forCompute = 0
        this.spsMpf = 0
        // MOCK
        this.spsBook = 0
        this.spsLoan = 0
        // ErrMsg('由於你們沒有入息，因此你們不能扣除居所貸款利息。')
      }
      this.STCIn2 = parseFloat(this.slfIncome) + parseFloat(this.slfResi)
      this.STCIn3 = parseFloat(this.spsIncome) + parseFloat(this.spsResi)

      // 子女兄弟姊妹祖父母 扣稅 parameter
      this.STCIn4 = (parseFloat(this.CAbb) < 10) ? parseFloat(this.CAbb) : 0
      this.STCIn5 = isNaN(parseFloat(this.brosis_dep)) ? 0 : parseFloat(this.brosis_dep)
      this.STCIn6 = isNaN(parseFloat(this.resi_parent)) ? 0 : parseFloat(this.resi_parent)
      this.STCIn7 = isNaN(parseFloat(this.non_resi_parent)) ? 0 : parseFloat(this.non_resi_parent)
      this.STCIn9 = (this.spouse_disabled_dependent_DIS) === true
      this.STCIn10 = isNaN(parseFloat(this.NBbb_DIS)) ? 0 : parseFloat(this.NBbb_DIS)
      this.STCIn11 = isNaN(parseFloat(this.brosis_dep_DIS)) ? 0 : parseFloat(this.brosis_dep_DIS)
      this.STCIn12 = isNaN(parseFloat(this.resi_parent_DIS)) ? 0 : parseFloat(this.resi_parent_DIS)
      this.STCIn13 = isNaN(parseFloat(this.non_resi_parent_DIS)) ? 0 : parseFloat(this.non_resi_parent_DIS)
      this.slfOE = isNaN(parseFloat(this.slfOE)) ? 0 : parseFloat(this.slfOE)
      this.spsOE = isNaN(parseFloat(this.spsOE)) ? 0 : parseFloat(this.spsOE)
      // if (this.slfOE > this.STCIn2) {
      //   this.slfOE = this.STCIn2
      // }
      // if (this.spsOE > this.STCIn3) {
      //   this.spsOE = this.STCIn3
      // }
      this.slfSEE = isNaN(parseFloat(this.slfSEE)) ? 0 : parseFloat(this.slfSEE)
      // if (this.slfSEE > (this.STCIn2 - this.slfOE)) {
      //   this.slfSEE = this.STCIn2 - this.slfOE
      // }
      this.spsSEE = isNaN(parseFloat(this.spsSEE)) ? 0 : parseFloat(this.spsSEE)
      // if (this.spsSEE > (this.STCIn3 - this.spsOE)) {
      //   this.spsSEE = this.STCIn3 - this.spsOE
      // }

      var tslfOE = parseFloat(this.slfOE)
      var tslfSEE = parseFloat(this.slfSEE)
      var tSTCIn2 = parseFloat(this.STCIn2)
      var tspsOE = parseFloat(this.spsOE)
      var tspsSEE = parseFloat(this.spsSEE)
      var tSTCIn3 = parseFloat(this.STCIn3)

      if (tslfOE + tslfSEE > tSTCIn2) {
        if (Math.abs(tSTCIn3) - Math.abs(tslfSEE) > 0 && tslfSEE <= this.LimD_Education) {
          this.slfOE = Math.abs(tSTCIn2) - Math.abs(tslfSEE)
          this.slfOE_CAP = Math.abs(tSTCIn2) - Math.abs(tslfSEE)
        } else {
          this.slfOE = 0
        }
      }
      if (this.slfSEE > tSTCIn2) {
        this.slfSEE = tSTCIn2
      }
      if (tspsOE + tspsSEE > tSTCIn3) {
        if (Math.abs(tSTCIn3) - Math.abs(tspsSEE) > 0 && tspsSEE <= this.LimD_Education) {
          this.spsOE = Math.abs(tSTCIn3) - Math.abs(tspsSEE)
          this.spsOE_CAP = Math.abs(tSTCIn3) - Math.abs(tspsSEE)
        } else {
          this.spsOE = 0
        }
      }
      if (this.spsSEE > tSTCIn3) {
        this.spsSEE = tSTCIn3
      }

      this.slfDona = parseFloat(this.slfDona)
      this.slfDona_restrict = parseFloat(this.slfDona_restrict) < 100 || isNaN(parseFloat(this.slfDona_restrict)) ? 0 : parseFloat(this.slfDona_restrict)
      this.spsDona = parseFloat(this.spsDona)
      this.spsDona_restrict = parseFloat(this.spsDona_restrict) < 100 || isNaN(parseFloat(this.spsDona_restrict)) ? 0 : parseFloat(this.spsDona_restrict)

      // 扣稅總額
      this.STCIn14 = parseFloat(this.slfDona_restrict) + parseFloat(this.slfERCE_forCompute) + parseFloat(this.slfMpf) + parseFloat(this.slfSEE) + parseFloat(this.slfOE)
      this.STCIn15 = parseFloat(this.spsDona_restrict) + parseFloat(this.spsERCE_forCompute) + parseFloat(this.spsMpf) + parseFloat(this.spsSEE) + parseFloat(this.spsOE)

      // 扣稅總額 onday_onday(5)
      this.STCIn14 = this.STCIn14 + parseFloat(this.slfMedInsu)
      this.STCIn15 = this.STCIn15 + parseFloat(this.spsMedInsu)

      // 扣稅總額: 年金、強積金自願供款 => 分開評稅
      var slfVolunMpf = parseFloat(this.slfVolunMpf) // onday_onday(7)
      var spsVolunMpf = parseFloat(this.spsVolunMpf)
      var sumVolunMpf = slfVolunMpf + spsVolunMpf
      if (slfVolunMpf > 60000) {
        slfVolunMpf = 60000
      }
      if (spsVolunMpf > 60000) {
        spsVolunMpf = 60000
      }
      if (slfVolunMpf + spsVolunMpf > 120000) {
        sumVolunMpf = 120000
      }
      this.STCIn14 = this.STCIn14 + parseFloat(slfVolunMpf)
      this.STCIn15 = this.STCIn15 + parseFloat(spsVolunMpf)

      // TO-WORK!!! T3tag T4tag has maximum donation
      this.STCIn16 = parseFloat(this.slfDona_restrict) + parseFloat(this.spsDona_restrict) // STCIn16 = CDbl(vm.T3tag) + CDbl(vm.T4tag)
      this.jntOE = parseFloat(this.slfOE) + parseFloat(this.spsOE)
      this.jntSEE = parseFloat(this.slfSEE) + parseFloat(this.spsSEE)
      this.STCIn16 = this.STCIn16 + parseFloat(this.slfERCE_forCompute) + parseFloat(this.slfMpf) + parseFloat(this.spsERCE_forCompute) + parseFloat(this.spsMpf) + parseFloat(this.jntOE) + parseFloat(this.jntSEE)
      if (this.STCIn2 > 0) {
        this.STCIn14 = this.STCIn14 + parseFloat(this.slfLoan)
      }
      if (this.STCIn3 > 0) {
        this.STCIn15 = this.STCIn15 + parseFloat(this.spsLoan)
      }
      if (this.STCIn2 > 0 || this.STCIn3 > 0) {
        this.STCIn16 = this.STCIn16 + parseFloat(this.slfLoan) + parseFloat(this.spsLoan)
      }
      this.STCIn16 = this.STCIn16 + parseFloat(this.slfMedInsu) + parseFloat(this.spsMedInsu)
      // 扣稅總額: 年金、強積金自願供款 => 合併評稅
      this.STCIn16 = this.STCIn16 + parseFloat(sumVolunMpf) // onday_onday(7)

      this.STCIn17 = parseInt(this.resi_parent_5560, 10)
      this.STCIn18 = parseInt(this.non_resi_parent_5560, 10)
      this.STCIn19 = (parseFloat(this.slfERCE_forCompute) > 0) ? parseFloat(this.slfDisdep) : 0
      this.STCIn20 = (parseFloat(this.spsERCE_forCompute) > 0) ? parseFloat(this.spsDisdep) : 0
      this.STCIn21 = parseInt(this.NBbb, 10)
      this.STCIn22 = parseInt(this.CAbb_DIS, 10)
      // this.STCIn23 = (parseInt(this.single_parent, 10) === 1)
      this.STCIn23 = (this.single_parent === true)
      this.ChkDD(0)

      // 基本免稅額
      STCOut[3] = this.AL_SING + this.AASing
      STCOut[4] = this.AL_MARR + this.AAMarr
      STCOut[5] = this.SPA
      STCOut[18] = this.CA[this.STCIn4]
      STCOut[19] = this.DBSA * this.STCIn5
      STCOut[21] = (this.DPA + this.ADPA) * this.STCIn6
      STCOut[22] = this.DPA * this.STCIn7
      STCOut[20] = STCOut[21] + STCOut[22]
      STCOut[34] = false // 以標準稅率計算
      STCOut[57] = this.STCIn14
      STCOut[58] = this.STCIn15
      STCOut[59] = this.STCIn16
      STCOut[75] = this.CA[this.STCIn21] + this.NBCA[this.STCIn21]
      STCOut[78] = (this.slfERCE_forCompute > this.LimD_Elderly * this.slfElder) ? this.LimD_Elderly * this.slfElder : this.slfERCE_forCompute
      STCOut[79] = (this.spsERCE_forCompute > this.LimD_Elderly * this.slfElder) ? this.LimD_Elderly * this.slfElder : this.spsERCE_forCompute
      self_DISABLE_deduct = (this.self_disabled_DIS === true && this.STCIn2 > 0) ? 75000 : 0 // onday_onday(new)
      sps_DISABLE_deduct = (this.sps_disabled_DIS === true && this.martial_status === 'M' && this.STCIn3 > 0) ? 75000 : 0 // onday_onday(new)
      // // MOCK
      // self_iang_visa_deduct = (this.self_iang_visa === true && this.STCIn2 > 0) ? 75000 : 0
      // sps_iang_visa_deduct = (this.self_iang_visa === true && this.martial_status === 'M' && this.STCIn3 > 0) ? 75000 : 0

      // console.log('self_DISABLE_deduct', self_DISABLE_deduct, this.self_disabled_DIS)

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
      if (this.netJointI < 0) {
        this.netJointI = 0
      }
      STCOut[2] = this.STCIn2 + this.STCIn3

      // 標準稅 計算
      this.slfStdTP = this.netSelfI * this.STD_RATE / 100 // self TP at standard rate
      this.spsStdTP = this.netSpouseI * this.STD_RATE / 100 // spouse TP at standard rate
      this.jointStdTP = this.netJointI * this.STD_RATE / 100 // joint TP at standard rate
      // console.log('spsStdTP: ', this.spsStdTP, this.netSpouseI)

      // 分 case
      if (this.martial_status === 'S') { // 或只單一人有收入
        STCOut[3] = this.AL_SING + this.AASing
        STCOut[4] = this.AL_MARR + this.AAMarr
        STCOut[5] = tmp
        this.spsDDA = false
        if ((this.STCIn4 + this.STCIn21 > 0) && (this.STCIn23 === true)) {
          STCOut[5] = this.SPA
        } else { // STCIn4+STCIn21 === 0
          STCOut[5] = 0
        }
        STCOut[6] = this.CA[this.STCIn4]
        STCOut[7] = this.DBSA * this.STCIn5
        STCOut[9] = (this.DPA + this.ADPA) * this.STCIn6
        STCOut[10] = this.DPA * this.STCIn7
        STCOut[8] = STCOut[9] + STCOut[10]
        STCOut[12] = this.CA[this.STCIn4]
        STCOut[13] = this.DBSA * this.STCIn5
        STCOut[15] = (this.DPA + this.ADPA) * this.STCIn6
        STCOut[16] = this.DPA * this.STCIn7
        STCOut[14] = STCOut[15] + STCOut[16]

        STCOut[34] = this.StdFlag
        STCOut[32] = STCOut[30]
        STCOut[37] = this.STCIn4
        STCOut[38] = this.STCIn5
        STCOut[39] = this.STCIn6
        STCOut[40] = this.STCIn7
        STCOut[41] = this.STCIn4
        STCOut[42] = this.STCIn5
        STCOut[43] = this.STCIn6
        STCOut[44] = this.STCIn7

        STCOut[61] = (this.SDPGPA + this.SADPGPA) * this.STCIn17
        STCOut[62] = this.SDPGPA * this.STCIn18
        STCOut[60] = STCOut[61] + STCOut[62]
        STCOut[64] = (this.SDPGPA + this.SADPGPA) * this.STCIn17
        STCOut[65] = this.SDPGPA * this.STCIn18
        STCOut[63] = STCOut[64] + STCOut[65]
        STCOut[69] = this.STCIn17
        STCOut[70] = this.STCIn18
        STCOut[71] = this.STCIn17
        STCOut[72] = this.STCIn18
        STCOut[73] = this.CA[this.STCIn21] + this.NBCA[this.STCIn21]
        STCOut[74] = this.CA[this.STCIn21] + this.NBCA[this.STCIn21]
        STCOut[76] = this.STCIn21
        STCOut[77] = this.STCIn21
        STCOut[78] = this.slfERCE_forCompute

        if (this.STCIn8) {
          STCOut[11] = this.DIS_DA * (this.STCIn10 + this.STCIn11 + this.STCIn12 + this.STCIn13 + this.STCIn19 + this.STCIn22)

          STCOut[45] = this.STCIn10 + this.STCIn22
          STCOut[46] = this.STCIn11
          STCOut[47] = this.STCIn12
          STCOut[48] = this.STCIn13
          STCOut[49] = STCOut[45] + STCOut[46] + STCOut[47] + STCOut[48] + this.STCIn19
        } else {
          STCOut[11] = this.DIS_DA * this.STCIn19

          STCOut[49] = this.STCIn19
        }

        // SUM
        STCOut[24] = STCOut[3] + STCOut[5] + STCOut[6] + STCOut[7] + STCOut[8] + STCOut[60] + STCOut[11] + STCOut[73]
        STCOut[24] = STCOut[24] + self_DISABLE_deduct // onday_onday(new in 2018)
        STCOut[27] = this.netSelfI - STCOut[24]
        this.STCMainRV = 10
      } else { // === 'M'
        // 需要分case本人收入===0 (22) 或 配偶收入===0 (24)
        // 有得過俾配偶，計nMin, child_count
        if (this.STCIn3 === 0) { // taxtype === 22
          STCOut[0] = this.STCIn2
          STCOut[4] = this.AL_MARR + this.AAMarr
          STCOut[6] = this.CA[this.STCIn4]
          STCOut[7] = this.DBSA * this.STCIn5
          STCOut[9] = (this.DPA + this.ADPA) * this.STCIn6
          STCOut[10] = this.DPA * this.STCIn7
          STCOut[8] = STCOut[9] + STCOut[10]
          STCOut[61] = (this.SDPGPA + this.SADPGPA) * this.STCIn17
          STCOut[62] = this.SDPGPA * this.STCIn18
          STCOut[60] = STCOut[61] + STCOut[62]
          STCOut[73] = this.CA[this.STCIn21] + this.NBCA[this.STCIn21]
          this.slfNCI = 0
          this.slfNCI = this.netSelfI - (STCOut[4] + STCOut[6] + STCOut[7] + STCOut[8] + STCOut[60] + STCOut[73])

          if (this.STCIn8 === true) {
            if ((this.STCIn9 === true) && ((this.STCOut[0] - this.AL_SING - STCOut[57]) > 0)) {
              STCOut[11] = this.DIS_DA * (1 + this.STCIn10 + this.STCIn11 + this.STCIn12 + this.STCIn13 + this.STCIn19 + this.STCIn22)
              STCOut[55] = true
            } else {
              STCOut[11] = this.DIS_DA * (this.STCIn10 + this.STCIn11 + this.STCIn12 + this.STCIn13 + this.STCIn19 + this.STCIn22)
            }
          } else { // STCIn8 === false
            STCOut[11] = this.DIS_DA * this.STCIn19
          }
          STCOut[24] = STCOut[4] + STCOut[6] + STCOut[7] + STCOut[8] + STCOut[60] + STCOut[11] + STCOut[73]
          // STCOut[24] = STCOut[24] + self_DISABLE_deduct + sps_DISABLE_deduct
          STCOut[24] = STCOut[24] + self_DISABLE_deduct
          STCOut[27] = this.netSelfI - STCOut[24]
          if (STCOut[27] < 0) {
            STCOut[27] = 0
          }
          STCOut[30] = Math.floor(this.CompTP(this.slfStdTP, STCOut[27]))
          STCOut[34] = this.StdFlag
          STCOut[32] = STCOut[30]
          STCOut[37] = this.STCIn4
          STCOut[38] = this.STCIn5
          STCOut[39] = this.STCIn6
          STCOut[40] = this.STCIn7
          STCOut[69] = this.STCIn17
          STCOut[70] = this.STCIn18
          STCOut[76] = this.STCIn21
          if (this.STCIn8 === true) {
            STCOut[45] = this.STCIn10 + this.STCIn22
            STCOut[46] = this.STCIn11
            STCOut[47] = this.STCIn12
            STCOut[48] = this.STCIn13
            STCOut[49] = STCOut[45] + STCOut[46] + STCOut[47] + STCOut[48] + this.STCIn19
          } else {
            STCOut[49] = this.STCIn19
          }
          this.STCMainRV = 22
        } else if (this.STCIn2 === 0) { // taxtype === 24
          STCOut[1] = this.STCIn3
          STCOut[4] = this.AL_MARR + this.AAMarr
          STCOut[12] = this.CA[this.STCIn4]
          STCOut[13] = this.DBSA * this.STCIn5
          STCOut[15] = (this.DPA + this.ADPA) * this.STCIn6
          STCOut[16] = this.DPA * this.STCIn7
          STCOut[14] = STCOut[15] + STCOut[16]
          STCOut[64] = (this.SDPGPA + this.SADPGPA) * this.STCIn17
          STCOut[65] = this.SDPGPA * this.STCIn18
          STCOut[63] = STCOut[64] + STCOut[65]
          STCOut[74] = this.CA[this.STCIn21] + this.NBCA[this.STCIn21]
          if (this.STCIn8 === true) {
            STCOut[17] = this.DIS_DA * (this.STCIn10 + this.STCIn11 + this.STCIn12 + this.STCIn13 + this.STCIn20 + this.STCIn22)
          } else {
            STCOut[17] = this.DIS_DA * this.STCIn20
          }
          // 這個是配偶的免稅額，沒有加傷殘這個
          STCOut[25] = STCOut[4] + STCOut[12] + STCOut[13] + STCOut[14] + STCOut[63] + STCOut[17] + STCOut[74]
          STCOut[25] = STCOut[25] + sps_DISABLE_deduct

          STCOut[28] = this.netSpouseI - STCOut[25]
          if (STCOut[28] < 0) {
            STCOut[28] = 0
          }
          // console.log(this.netSpouseI, STCOut[25])
          // console.log(this.spsStdTP, STCOut[28], this.CompTP(this.spsStdTP, STCOut[28]))
          // console.log('===========')
          STCOut[31] = Math.floor(this.CompTP(this.spsStdTP, STCOut[28]))
          STCOut[35] = this.StdFlag
          STCOut[32] = STCOut[31]
          STCOut[41] = this.STCIn4
          STCOut[42] = this.STCIn5
          STCOut[43] = this.STCIn6
          STCOut[44] = this.STCIn7
          STCOut[71] = this.STCIn17
          STCOut[72] = this.STCIn18
          STCOut[77] = this.STCIn21
          if (this.STCIn8 === true) {
            STCOut[50] = this.STCIn10 + this.STCIn22
            STCOut[51] = this.STCIn11
            STCOut[52] = this.STCIn12
            STCOut[53] = this.STCIn13
            STCOut[54] = STCOut[50] + STCOut[51] + STCOut[52] + STCOut[53] + this.STCIn20
          } else {
            STCOut[54] = this.STCIn20
          }
          this.STCMainRV = 24
        } else { // taxtype === 30, 40, 42, 45
          STCOut[3] = this.AL_SING + this.AASing
          STCOut[4] = this.AL_MARR + this.AAMarr
          STCOut[5] = tmp
          STCOut[6] = this.CA[this.nMin * this.STCIn4]
          STCOut[7] = this.DBSA * this.oMin
          STCOut[9] = (this.DPA + this.ADPA) * this.mMin
          STCOut[10] = this.DPA * this.lMin
          STCOut[8] = STCOut[9] + STCOut[10]
          STCOut[11] = this.DIS_DA * (this.nMin * (this.STCIn10 + this.STCIn22) + this.odMin + this.ldMin + this.mdMin + this.STCIn19)
          STCOut[12] = this.CA[(1 - this.nMin) * this.STCIn4]
          STCOut[13] = this.DBSA * (this.STCIn5 - this.oMin)
          STCOut[15] = (this.DPA + this.ADPA) * (this.STCIn6 - this.mMin)
          STCOut[16] = this.DPA * (this.STCIn7 - this.lMin)
          STCOut[14] = STCOut[15] + STCOut[16]
          STCOut[37] = this.nMin * this.STCIn4
          STCOut[38] = this.oMin
          STCOut[39] = this.mMin
          STCOut[40] = this.lMin
          STCOut[41] = (1 - this.nMin) * this.STCIn4
          STCOut[42] = this.STCIn5 - this.oMin
          STCOut[43] = this.STCIn6 - this.mMin
          STCOut[44] = this.STCIn7 - this.lMin

          STCOut[61] = (this.SDPGPA + this.SADPGPA) * this.qMin
          STCOut[62] = this.SDPGPA * this.pMin
          STCOut[60] = STCOut[61] + STCOut[62]
          STCOut[64] = (this.SDPGPA + this.SADPGPA) * (this.STCIn17 - this.qMin)
          STCOut[65] = this.SDPGPA * (this.STCIn18 - this.pMin)
          STCOut[63] = STCOut[64] + STCOut[65]
          STCOut[67] = (this.SDPGPA + this.SADPGPA) * this.STCIn17
          STCOut[68] = this.SDPGPA * this.STCIn18
          STCOut[66] = STCOut[67] + STCOut[68]
          STCOut[69] = this.qMin
          STCOut[70] = this.pMin
          STCOut[71] = this.STCIn17 - this.qMin
          STCOut[72] = this.STCIn18 - this.pMin
          STCOut[73] = this.CA[this.nMin * this.STCIn21] + this.NBCA[this.nMin * this.STCIn21]
          STCOut[74] = this.CA[(1 - this.nMin) * this.STCIn21] + this.NBCA[(1 - this.nMin) * this.STCIn21]
          STCOut[76] = this.nMin * this.STCIn21
          STCOut[77] = (1 - this.nMin) * this.STCIn21

          this.cal_join_min()

          // // // // // // // // // //
          // SUM
          this.jntNCIDDAsps = this.netJointI - (this.AL_MARR + this.AAMarr) - this.CA[this.STCIn4] - this.DBSA * this.STCIn5 - (this.DPA * this.DPNo + this.ADPA * this.ADPNo) - this.DIS_DA * (1 + this.STCIn10 + this.STCIn11 + this.STCIn12 + this.STCIn13 + this.STCIn22) -
          (this.SDPGPA * this.SDPNo + this.SADPGPA * this.SADPNo) - this.DIS_DA * (this.STCIn19 + this.STCIn20) - (this.CA[this.STCIn21] + this.NBCA[this.STCIn21])

          // TODO.........SUM
          /* THIS IS TO ADD the sum up */
          STCOut[0] = this.STCIn2
          STCOut[1] = this.STCIn3
          STCOut[3] = this.AL_SING + this.AASing
          STCOut[6] = this.CA[this.nMin * this.STCIn4]
          STCOut[7] = this.DBSA * this.oMin
          STCOut[9] = (this.DPA + this.ADPA) * this.mMin
          STCOut[10] = this.DPA * this.lMin
          STCOut[8] = STCOut[9] + STCOut[10]
          STCOut[61] = (this.SDPGPA + this.SADPGPA) * this.qMin
          STCOut[62] = this.SDPGPA * this.pMin
          STCOut[60] = STCOut[61] + STCOut[62]
          STCOut[73] = this.CA[this.nMin * this.STCIn21] + this.NBCA[this.nMin * this.STCIn21]
          if (this.STCIn8 === true) {
            STCOut[11] = this.DIS_DA * (this.nMin * (this.STCIn10 + this.STCIn22) + this.odMin + this.ldMin + this.mdMin + this.STCIn19)
          } else {
            STCOut[11] = this.DIS_DA * this.STCIn19
          }
          STCOut[24] = STCOut[3] + STCOut[6] + STCOut[7] + STCOut[8] + STCOut[60] + STCOut[11] + STCOut[73]
          // STCOut[24] = STCOut[24] + self_DISABLE_deduct + sps_DISABLE_deduct
          STCOut[24] = STCOut[24] + self_DISABLE_deduct
          STCOut[12] = this.CA[(1 - this.nMin) * this.STCIn4]
          STCOut[13] = this.DBSA * (this.STCIn5 - this.oMin)
          STCOut[15] = (this.DPA + this.ADPA) * (this.STCIn6 - this.mMin)
          STCOut[16] = this.DPA * (this.STCIn7 - this.lMin)
          STCOut[14] = STCOut[15] + STCOut[16]
          STCOut[64] = (this.SDPGPA + this.SADPGPA) * (this.STCIn17 - this.qMin)
          STCOut[65] = this.SDPGPA * (this.STCIn18 - this.pMin)
          STCOut[63] = STCOut[64] + STCOut[65]
          STCOut[74] = this.CA[(1 - this.nMin) * this.STCIn21] + this.NBCA[(1 - this.nMin) * this.STCIn21]
          if (this.STCIn8 === true) {
            STCOut[17] = this.DIS_DA * ((1 - this.nMin) * (this.STCIn10 + this.STCIn22) + this.STCIn11 - this.odMin + this.STCIn13 - this.ldMin + this.STCIn12 - this.mdMin + this.STCIn20)
          } else {
            STCOut[17] = this.DIS_DA * this.STCIn20
          }
          STCOut[25] = STCOut[3] + STCOut[12] + STCOut[13] + STCOut[14] + STCOut[63] + STCOut[17] + STCOut[74]
          STCOut[25] = STCOut[25] + sps_DISABLE_deduct
          STCOut[27] = this.netSelfI - STCOut[24]
          if (STCOut[27] < 0) STCOut[27] = 0
          STCOut[28] = this.netSpouseI - STCOut[25]
          if (STCOut[28] < 0) STCOut[28] = 0
          STCOut[30] = Math.floor(this.CompTP(this.slfStdTP, STCOut[27]))
          STCOut[34] = this.slfMinStd
          STCOut[31] = Math.floor(this.CompTP(this.spsStdTP, STCOut[28]))
          STCOut[35] = this.spsMinStd
          STCOut[32] = STCOut[30] + STCOut[31]
          this.slfRebate = this.CalculateRebate(STCOut[30], this.YrEnd)
          this.spsRebate = this.CalculateRebate(STCOut[31], this.YrEnd)
          STCOut[37] = this.nMin * this.STCIn4
          STCOut[38] = this.oMin
          STCOut[39] = this.mMin
          STCOut[40] = this.lMin
          STCOut[69] = this.qMin
          STCOut[70] = this.pMin
          STCOut[41] = (1 - this.nMin) * this.STCIn4
          STCOut[42] = this.STCIn5 - this.oMin
          STCOut[43] = this.STCIn6 - this.mMin
          STCOut[44] = this.STCIn7 - this.lMin
          STCOut[71] = this.STCIn17 - this.qMin
          STCOut[72] = this.STCIn18 - this.pMin
          STCOut[76] = this.nMin * this.STCIn21
          STCOut[77] = (1 - this.nMin) * this.STCIn21
          if (this.STCIn8 === true) {
            STCOut[45] = this.nMin * (this.STCIn10 + this.STCIn22)
            STCOut[46] = this.odMin
            STCOut[47] = this.mdMin
            STCOut[48] = this.ldMin
            STCOut[49] = STCOut[45] + STCOut[46] + STCOut[47] + STCOut[48] + this.STCIn19
            STCOut[50] = (1 - this.nMin) * (this.STCIn10 + this.STCIn22)
            STCOut[51] = this.STCIn11 - this.odMin
            STCOut[52] = this.STCIn12 - this.mdMin
            STCOut[53] = this.STCIn13 - this.ldMin
            STCOut[54] = STCOut[50] + STCOut[51] + STCOut[52] + STCOut[53] + this.STCIn20
          } else {
            STCOut[49] = this.STCIn19
            STCOut[54] = this.STCIn20
          }
          STCOut[2] = this.STCIn2 + this.STCIn3
          STCOut[4] = this.AL_MARR + this.AAMarr // /////////
          STCOut[18] = this.CA[this.STCIn4]
          STCOut[19] = this.DBSA * this.STCIn5
          STCOut[21] = (this.DPA + this.ADPA) * this.STCIn6
          STCOut[22] = this.DPA * this.STCIn7
          STCOut[20] = STCOut[21] + STCOut[22]
          STCOut[67] = (this.SDPGPA + this.SADPGPA) * this.STCIn17
          STCOut[68] = this.SDPGPA * this.STCIn18
          STCOut[66] = STCOut[67] + STCOut[68]
          STCOut[75] = this.CA[this.STCIn21] + this.NBCA[this.STCIn21]
          if (this.STCIn8 === true) {
            if ((this.STCIn9 === true) && ((this.STCIn2 - STCOut[3] - STCOut[57]) > 0)) {
              STCOut[23] = this.DIS_DA * (1 + this.STCIn10 + this.STCIn11 + this.STCIn12 + this.STCIn13 + this.STCIn19 + this.STCIn20 + this.STCIn22)
              // console.log('JJJJJ', 1, this.STCIn10, this.STCIn11, this.STCIn12, this.STCIn13, this.STCIn19, this.STCIn20, this.STCIn22)
              STCOut[55] = true
              this.spsDDA = true
            } else {
              STCOut[23] = this.DIS_DA * (this.STCIn10 + this.STCIn11 + this.STCIn12 + this.STCIn13 + this.STCIn19 + this.STCIn20 + this.STCIn22)
              this.spsDDA = false
            }
          } else { // STCIn8 === false
            STCOut[23] = this.DIS_DA * (this.STCIn19 + this.STCIn20)
          }
          STCOut[26] = STCOut[4] + STCOut[18] + STCOut[19] + STCOut[20] + STCOut[66] + STCOut[23] + STCOut[75]
          STCOut[26] = STCOut[26] + self_DISABLE_deduct + sps_DISABLE_deduct
          STCOut[29] = this.netJointI - STCOut[26]
          if (STCOut[29] < 0) STCOut[29] = 0
          STCOut[33] = Math.floor(this.CompTP(this.jointStdTP, STCOut[29]))
          STCOut[36] = this.StdFlag

          if (this.STCIn8) {
            // 有供養傷殘
            // console.log('有供養傷殘: ', this.STCIn2, STCOut[3], STCOut[57])
            if ((this.STCIn9 === true) && ((this.STCIn2 - STCOut[3] - STCOut[57]) > 0)) {
              STCOut[23] = this.DIS_DA * (1 + this.STCIn10 + this.STCIn11 + this.STCIn12 + this.STCIn13 + this.STCIn19 + this.STCIn20 + this.STCIn22)
              STCOut[55] = true
              this.spsDDA = true
            } else {
              STCOut[23] = this.DIS_DA * (this.STCIn10 + this.STCIn11 + this.STCIn12 + this.STCIn13 + this.STCIn19 + this.STCIn20 + this.STCIn22)
              this.spsDDA = false
            }
            STCOut[17] = this.DIS_DA * ((1 - this.nMin) * (this.STCIn10 + this.STCIn22) + this.STCIn11 - this.odMin + this.STCIn13 - this.ldMin + this.STCIn12 - this.mdMin + this.STCIn20)
            STCOut[24] = STCOut[3] + STCOut[6] + STCOut[7] + STCOut[8] + STCOut[60] + STCOut[11] + STCOut[73]
            // STCOut[24] = STCOut[24] + self_DISABLE_deduct + sps_DISABLE_deduct
            STCOut[24] = STCOut[24] + self_DISABLE_deduct
            STCOut[25] = STCOut[3] + STCOut[12] + STCOut[13] + STCOut[14] + STCOut[63] + STCOut[17] + STCOut[74]
            // modification add in disbalbed 7500
            STCOut[25] = STCOut[25] + sps_DISABLE_deduct
            STCOut[26] = STCOut[4] + STCOut[18] + STCOut[19] + STCOut[20] + STCOut[66] + STCOut[23] + STCOut[75]
            STCOut[26] = STCOut[26] + self_DISABLE_deduct + sps_DISABLE_deduct
            STCOut[49] = STCOut[45] + STCOut[46] + STCOut[47] + STCOut[48] + this.STCIn19
            STCOut[54] = STCOut[50] + STCOut[51] + STCOut[52] + STCOut[53] + this.STCIn20
          } else {
            // 沒有供養傷殘
            STCOut[17] = this.DIS_DA * this.STCIn20
            STCOut[23] = this.DIS_DA * (this.STCIn19 + this.STCIn20)
            STCOut[24] = STCOut[3] + STCOut[6] + STCOut[7] + STCOut[8] + STCOut[60] + STCOut[11] + STCOut[73]
            // STCOut[24] = STCOut[24] + self_DISABLE_deduct + sps_DISABLE_deduct
            STCOut[24] = STCOut[24] + self_DISABLE_deduct
            STCOut[25] = STCOut[3] + STCOut[12] + STCOut[13] + STCOut[14] + STCOut[63] + STCOut[17] + STCOut[74]
            // modification add in disbalbed 7500
            STCOut[25] = STCOut[25] + sps_DISABLE_deduct
            STCOut[26] = STCOut[4] + STCOut[18] + STCOut[19] + STCOut[20] + STCOut[66] + STCOut[23] + STCOut[75]
            STCOut[26] = STCOut[26] + self_DISABLE_deduct + sps_DISABLE_deduct
            STCOut[27] = this.netSelfI - STCOut[24]
            STCOut[28] = this.netSpouseI - STCOut[25]
            STCOut[29] = this.netJointI - STCOut[26]
            STCOut[49] = this.STCIn19
            STCOut[54] = this.STCIn20
          }
          // console.log('1GGGG', STCOut[4], STCOut[12], STCOut[13], STCOut[14], STCOut[63], STCOut[17], STCOut[74])
          // console.log('2GGGG', STCOut[3], STCOut[12], STCOut[13], STCOut[14], STCOut[63], STCOut[17], STCOut[74])
        }
      }

      // 配偶是傷殘
      if (this.spsDDA) {
        if (STCOut[78] > 0) {
          STCOut[57] = STCOut[57] - STCOut[78]
        }
      }

      if (STCOut[27] < 0) STCOut[27] = 0
      if (STCOut[28] < 0) STCOut[28] = 0
      if (STCOut[29] < 0) STCOut[29] = 0
      STCOut[30] = Math.floor(this.CompTP(this.slfStdTP, STCOut[27]))
      STCOut[31] = Math.floor(this.CompTP(this.spsStdTP, STCOut[28]))
      STCOut[33] = Math.floor(this.CompTP(this.jointStdTP, STCOut[29])) // have rebate

      if (this.martial_status === 'S') { // 或只單一人有收入
        STCOut[32] = STCOut[30]
      } else {
        STCOut[32] = STCOut[30] + STCOut[31]
      }

      // TODO - Rebate
      this.JARebate = 0
      this.slfRebate = 0
      this.spsRebate = 0

      // console.log('pre 30: ', this.slfStdTP, STCOut[27])
      // console.log('pre 31: ', this.spsStdTP, STCOut[28])
      // console.log('30,31: ', STCOut[30], STCOut[31])
      // console.log('33,32: ', STCOut[33], STCOut[32])
      if (this.martial_status === 'M' && this.STCIn3 !== 0 && this.STCIn2 !== 0) {
        // console.log('(1)合拼 vs 分開: ', STCOut[33], STCOut[32])

        // 分開抵啲
        if ((STCOut[33] - this.JARebate) < (STCOut[32] - this.slfRebate - this.spsRebate)) {
          // 配偶是傷殘(JAD)
          if (this.spsDDA) {
            this.STCMainRV = 42

            STCOut[24] = STCOut[3]
            // STCOut[24] = STCOut[24] + self_DISABLE_deduct + sps_DISABLE_deduct
            STCOut[24] = STCOut[24] + self_DISABLE_deduct
            STCOut[25] = STCOut[3] + STCOut[12] + STCOut[13] + STCOut[14] + STCOut[63] + STCOut[17] + STCOut[74] + STCOut[6] + STCOut[7] + STCOut[8] + STCOut[60] + STCOut[11] + STCOut[73]
            // modification add in disbalbed 7500
            STCOut[25] = STCOut[25] + sps_DISABLE_deduct
            STCOut[27] = parseFloat(this.netSelfI) - parseFloat(STCOut[24]) + parseFloat(STCOut[78])
            if (STCOut[27] < 0) STCOut[27] = 0
            STCOut[28] = parseFloat(this.netSpouseI) - parseFloat(STCOut[25]) - parseFloat(STCOut[78])
            if (STCOut[28] < 0) STCOut[28] = 0

            if (STCOut[78] > 0) {
              STCOut[57] = STCOut[57] - parseFloat(STCOut[78])
              STCOut[58] = STCOut[58] + parseFloat(STCOut[78])

              this.netSelfI = this.STCIn2 - this.STCIn14 + parseFloat(STCOut[78])
              if (this.netSelfI < 0) this.netSelfI = 0
              this.netSpouseI = this.STCIn3 - this.STCIn15 - parseFloat(STCOut[78])
              if (this.netSpouseI < 0) this.netSpouseI = 0

              this.slfStdTP = this.netSelfI * this.STD_RATE / 100 // self TP at standard rate
              this.spsStdTP = this.netSpouseI * this.STD_RATE / 100 // spouse TP at standard rate
            }
            // console.table(['### ', this.slfStdTP, STCOut[27], this.netSelfI, STCOut[24], STCOut[78]])
            STCOut[30] = Math.floor(this.CompTP(this.slfStdTP, STCOut[27]))
            STCOut[34] = this.StdFlag
            STCOut[31] = Math.floor(this.CompTP(this.spsStdTP, STCOut[28]))
            STCOut[35] = this.StdFlag
            STCOut[32] = STCOut[30] + STCOut[31]
            this.slfRebate = this.CalculateRebate(STCOut[30], this.YrEnd)
            this.spsRebate = this.CalculateRebate(STCOut[31], this.YrEnd)

            // （合拼）與標準稅較低者 TP 大於 （分開）現時的 Tax Position
            console.log('(2)傷殘配偶 - 合拼 vs 分開: ', STCOut[33], STCOut[32], STCOut[27], STCOut[28])
            if (STCOut[33] >= STCOut[32]) {
              this.STCMainRV = 45 // JAD
            }
          } else {
            this.STCMainRV = 40
          }
        } else {
          this.STCMainRV = 30
        }
      }
      // console.log('single_parent: ', this.single_parent)

      STCOut[73] = this.CA[this.STCIn21] + this.NBCA[this.STCIn21]
      this.STCOut = STCOut
      return STCOut
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
        '#self_donation': this.slfDona_restrict,
        '#spouse_donation': this.spsDona_restrict,
        '#self_mpf': this.slfMpf,
        '#spouse_mpf': this.spsMpf,
        // MOCK
        '#self_book': this.slfBook,
        '#spouse_book': this.spsBook,
        '#self_homeloan': this.slfLoan,
        '#spouse_homeloan': this.spsLoan,
        '#self_elderly': this.slfElder,
        '#self_disabledep': this.slfDisdep,
        '#self_eldresi_amt': this.slfERCE_forCompute,
        '#spouse_elderly': this.spsElder,
        '#spouse_disabledep': this.spsDisdep,
        '#spouse_eldresi_amt': this.spsERCE_forCompute,
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
        '#spouse_disabled_dependent_DIS': this.spouse_disabled_dependent_DIS,
        '#self_medic_insu': this.slfMedInsu, // onday_onday(11)
        '#spouse_medic_insu': this.spsMedInsu,
        '#self_disabled_DIS': this.self_disabled_DIS,
        '#sps_disabled_DIS': this.sps_disabled_DIS,
        // Mock
        '#self_iang_visa': this.self_iang_visa,
        '#sps_iang_visa': this.sps_iang_visa,
        '#slfDiseaseExp': this.slfDiseaseExp,
        '#spsDiseaseExp': this.spsDiseaseExp
      }
    }
  },
  created () {
    window.G = {}
    window.G.vm = this
    this.init()
    this.main1()
    this.get_rate()
  }
}
