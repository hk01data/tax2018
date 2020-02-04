// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL
    var vue_mdl = {
      "martial_status": "martial_status",
      "#self_income": "slfIncome",
      "#spouse_income": "spsIncome",
      "#self_residence": "slfResi",
      "#spouse_residence": "spsResi",
      "#self_oe": "slfOE",
      "#spouse_oe": "spsOE",
      "#self_eduexp": "slfSEE",
      "#spouse_eduexp": "spsSEE",
      "#self_donation": "slfDona",
      "#spouse_donation": "spsDona",
      "#self_mpf": "slfMpf",
      "#spouse_mpf": "spsMpf",
      "#self_homeloan": "slfLoan",
      "#spouse_homeloan": "spsLoan",
      "#self_elderly": "slfElder",
      "#self_disabledep": "slfDisdep",
      "#self_eldresi_amt": "slfERCE",
      "#spouse_elderly": "spsElder",
      "#spouse_disabledep": "spsDisdep",
      "#spouse_eldresi_amt": "spsERCE",
      "#NBbb": "NBbb",
      "#CAbb": "CAbb",
      "#single_parent": "single_parent",
      "#brosis_dep": "brosis_dep",
      "#resi_parent": "resi_parent",
      "#non_resi_parent": "non_resi_parent",
      "#resi_parent_5560": "resi_parent_5560",
      "#non_resi_parent_5560": "non_resi_parent_5560",
      "#NBbb_DIS": "NBbb_DIS",
      "#CAbb_DIS": "CAbb_DIS",
      "#brosis_dep_DIS": "brosis_dep_DIS",
      "#resi_parent_DIS": "resi_parent_DIS",
      "#non_resi_parent_DIS": "non_resi_parent_DIS",
      "#spouse_disabled_dependent_DIS": "spouse_disabled_dependent_DIS"
    }
    var ipt_mapp = {
      // 'vue': 'IRD',
      // '@@input': '<input>',
      'input[value="S"]': 'input[value="S"]',
      'input[value="M"]': 'input[value="S"]',
      '#self_income': '#SelfIncome',
      '#spouse_income': '#SpouseIncome',
      '#self_residence': '#SelfResidence',
      '#spouse_residence': '#SpouseResidence',
      '#self_oe': '#SelfOAndE',
      '#spouse_oe': '#SpouseOAndE',
      '#self_eduexp': '#SelfEducationExpenses',
      '#spouse_eduexp': '#SpouseEducationExpenses',
      '#self_donation': '#SelfApprovedDonations',
      '#spouse_donation': '#SpouseApprovedDonations',
      '#self_mpf': '#SelfMPF',
      '#spouse_mpf': '#SpouseMPF',
      '#self_homeloan': '#SelfHomeLoanInterest',
      '#spouse_homeloan': '#SpouseHomeLoanInterest',
      '#self_eldresi_amt': '#SelfResidentialAmount',
      '#spouse_eldresi_amt': '#SpouseResidentialAmount',
      '@@reset': '#ResetButton',
      '@@compute': '#ComputeButton',
      '@@select': '<select>',
      '#self_elderly': '#SelfEldery',
      '#spouse_elderly': '#SpouseEldery',
      '#self_disabledep': '#SelfDisabledDependant',
      '#spouse_disabledep': '#SpouseDisabledDependant',
      '#NBbb': '#ChildBornThisYr',
      '#NBbb_DIS': '#DisabledChildBornThisYr',
      '#CAbb': '#ChildBornOtherYr',
      '#CAbb_DIS': '#DisabledChildBornOtherYr',
      '#single_parent': '#SingleParentAllowance',
      '#brosis_dep': '#DependentBrothersSis',
      '#brosis_dep_DIS': '#DisabledDependentBrothersSis',
      '#resi_parent': '#DependentparentsResided',
      '#resi_parent_DIS': '#DisabledDependentparentsResided',
      '#non_resi_parent': '#DependentparentsNotResided',
      '#non_resi_parent_DIS': '#DisabledDependentparentsNotResided',
      '#resi_parent_5560': '#Dependentparents55_60Resided',
      '#non_resi_parent_5560': '#Dependentparents55_60NotResided',
      '#spouse_disabled_dependent_DIS': '#SpouseDisabledDependent'
    }
    var range_obj = {
      'martial_status': {'type': 'radio', 'range': ['S', 'M']},
      'SelfIncome': {'type': 'value', 'range': [0, 99999999], 'step': 1000},
      'SpouseIncome': {'type': 'value', 'range': [0, 99999999], 'step': 1000},
      'SelfResidence': {'type': 'value', 'range': [0, 99999999], 'step': 1000},
      'SpouseResidence': {'type': 'value', 'range': [0, 99999999], 'step': 1000},
      'SelfOAndE': {'type': 'value', 'range': [0, 99999999], 'step': 1000},
      'SpouseOAndE': {'type': 'value', 'range': [0, 99999999], 'step': 1000},
      'SelfEducationExpenses': {'type': 'value', 'range': [0, 99999999], 'step': 1000},
      'SpouseEducationExpenses': {'type': 'value', 'range': [0, 99999999], 'step': 1000},
      'SelfApprovedDonations': {'type': 'value', 'range': [0, 99999999], 'step': 1000},
      'SpouseApprovedDonations': {'type': 'value', 'range': [0, 99999999], 'step': 1000},
      'SelfMPF': {'type': 'value', 'range': [0, 99999999], 'step': 1000},
      'SpouseMPF': {'type': 'value', 'range': [0, 99999999], 'step': 1000},
      'SelfHomeLoanInterest': {'type': 'value', 'range': [0, 99999999], 'step': 1000},
      'SpouseHomeLoanInterest': {'type': 'value', 'range': [0, 99999999], 'step': 1000},
      'SelfResidentialAmount': {'type': 'value', 'range': [0, 99999999], 'step': 1000},
      'SpouseResidentialAmount': {'type': 'value', 'range': [0, 99999999], 'step': 1000},

      'SelfEldery': {'type': 'value', 'range': [0, 4], 'step': 1},
      'SpouseEldery': {'type': 'value', 'range': [0, 4], 'step': 1},
      'SelfDisabledDependant': {'type': 'value', 'range': [0, 4], 'step': 1},
      'SpouseDisabledDependant': {'type': 'value', 'range': [0, 4], 'step': 1},
      'ChildBornThisYr': {'type': 'value', 'range': [0, 9], 'step': 1},
      'DisabledChildBornThisYr': {'type': 'value', 'range': [0, 9], 'step': 1},
      'ChildBornOtherYr': {'type': 'value', 'range': [0, 9], 'step': 1},
      'DisabledChildBornOtherYr': {'type': 'value', 'range': [0, 9], 'step': 1},
      'SingleParentAllowance': {'type': 'radio', 'range': [false, true]},
      'DependentBrothersSis': {'type': 'value', 'range': [0, 9], 'step': 1},
      'DisabledDependentBrothersSis': {'type': 'value', 'range': [0, 9], 'step': 1},
      'DependentparentsResided': {'type': 'value', 'range': [0, 4], 'step': 1},
      'DisabledDependentparentsResided': {'type': 'value', 'range': [0, 4], 'step': 1},
      'DependentparentsNotResided': {'type': 'value', 'range': [0, 4], 'step': 1},
      'DisabledDependentparentsNotResided': {'type': 'value', 'range': [0, 4], 'step': 1},
      'Dependentparents55_60Resided': {'type': 'value', 'range': [0, 4], 'step': 1},
      'Dependentparents55_60NotResided': {'type': 'value', 'range': [0, 4], 'step': 1},
      'SpouseDisabledDependent': {'type': 'radio', 'range': [false, true]}
    }

    /*
    // browser
      // .url(devServer)
      // .waitForElementVisible('#app', 5000)
      // .assert.elementPresent('.hello')
      // .assert.containsText('h1', 'Welcome to Your Vue.js PWA')
      // .assert.elementCount('img', 1)
      // .end()
    // browser
      // .url('http://www.google.com')
      // .waitForElementVisible('body', 1000)
      // .setValue('input[type=text]', 'nightwatch')
      // .waitForElementVisible('input.lsb[value]', 1000)
      // .click('input.lsb[value]')
      // .pause(2000)
      // .assert.containsText('#resultStats', '搜尋結果')
      // .end()
    */
    var out_obj = {}
    var test_browser = {}
    var ird_browser = {}
    var for_browser = {}
    
    /*
    function show_param (browser, in_obj) {
      var output = {}
      try {
        output = do_vue(browser, in_obj)
      } catch (error) {
        console.log(error);
        console.log(
        '#self_income: ', in_obj['#self_income'],
        '#NBbb: ', in_obj['#NBbb'],
        '#CAbb: ', in_obj['#CAbb'],
        '#spouse_income: ', in_obj['#spouse_income'],
        '#self_oe: ', in_obj['#self_oe'],
        '#spouse_oe: ', in_obj['#spouse_oe'],
        )
      }

      return output
    }
    */
    function do_vue (browser, in_obj, cb) {

      var in_obj2 = in_obj
      var in_obj2 = in_obj.constructor();
      for (var attr in in_obj) {
        if (in_obj.hasOwnProperty(attr)) {
          in_obj2[attr] = in_obj[attr]
        }
      }
      var selector = in_obj; //The selector you want
      test_browser = browser
        .url(devServer)
        // .waitForElementVisible('body', 1000)
        .pause(500)
        
        // inject js code: https://gist.github.com/Hasan330/f8a8f64d428c2950e586
        // https://github.com/nightwatchjs/nightwatch-docs/blob/master/api/method/executeAsync.md
        .timeoutsAsyncScript(10000)
        .executeAsync(function(_in_obj, done) {
          
          function callback (_in_obj) {
            var in_obj0 = _in_obj.selector
            var vue_mdl = _in_obj.vue_mdl
            var in_obj1 = in_obj0.constructor();
            for (var attr in in_obj0) {
              if (in_obj0.hasOwnProperty(attr)) {
                in_obj1[attr] = in_obj0[attr]
              }
            }
            
            // assign input by using browser-wise
            for (var key in in_obj0) {
              console.log("Key0: ", key, vue_mdl[key], in_obj0[key])
              window.G.vm.$set(window.G.vm, vue_mdl[key], in_obj0[key])
            }
            
            window.G.vm.$nextTick(function () {
              console.log("Key1: ", window.G.vm.return_vm())
              done(window.G.vm.return_vm())
            })
          }


          
          callback(_in_obj)
        },
        [{selector: selector, vue_mdl: vue_mdl}],
        function(result) {
          // var hotelsFromDom = result.value;
          // client.globals.frontEndHotels = result.value;
          // console.log(client.globals.frontEndHotels);
          in_obj2 = result.value
          for (var key in in_obj2) {
            console.log("Key2: ", key, vue_mdl[key], in_obj2[key])
          }
          
          
          
          test_browser = test_browser
            .pause(1000)
            .useXpath()
            .elements('xpath', '//td[text()="總 免 稅 額"]/following-sibling::*', function(result0){
              els = result0.value;

              console.log('>>', els.length)
              var idx = 0
              els.forEach(function(element0) {
                browser.elementIdText(element0.ELEMENT, function(result1){
                  console.log('# ', idx, ' ', result1.value.trim().replace(/,/g, ''))
                  out_obj[idx] = result1.value.trim().replace(/,/g, '')
                  idx++
                })
              })
            })
            .pause(1000)
          

          cb({
            'in_obj': in_obj2,
            'out_obj': out_obj,
            'browser': test_browser
          })
          

          
          
        })

        

      /* input one by one is too slow *-/
      for (var key in in_obj) {
        if ('martial_status' === key) {
          test_browser = test_browser
            .click('input[value="' + in_obj[key] + '"]')
        } else {
          test_browser = test_browser
            .clearValue(key)
            .setValue(key, in_obj[key])
        }
      }
      /-* */


      
    }
    function do_ird (_in_obj) {
      var in_obj = _in_obj.in_obj
      var out_obj = _in_obj.out_obj
      console.log('g9g ', in_obj)


      return _in_obj.browser
        .url('https://www.ird.gov.hk/chi/ese/st_comp_2017_18/cstcfrm.htm')
        .useCss()
        .waitForElementVisible('frame', 1600)
        .element('css selector', 'frame[name="main"]', function(result){
          mainframe = result.value;
          browser.frame(mainframe, function(result){
            ird_browser = browser
            .click('input[value="' + in_obj['martial_status'] + '"]')
            .useCss()

            /**/
            // TO-WORK!!!: DOM 入落個 frame 度
            // inject js code: https://gist.github.com/Hasan330/f8a8f64d428c2950e586
            .execute(function(_obj) {
              var in_obj0 = _obj.selector
              var vue_mdl = _obj.vue_mdl

              // assign input by using browser-wise
              for (var key in in_obj0) {
                console.log("Key: ", key, vue_mdl[key], in_obj0[key])
                if (key === '#spouse_disabled_dependent_DIS') {
                  document.querySelectorAll(vue_mdl[key])[0].value = ('1' === in_obj0[key]) ? 'True' : 'False'
                } else if (key === '#single_parent') {
                  document.querySelectorAll(vue_mdl[key])[0].value = ('1' === in_obj0[key]) ? 'True' : 'False'
                } else {
                  document.querySelectorAll(vue_mdl[key])[0].value = in_obj0[key]
                }
              }

              return 0
            },
            [{selector: in_obj, vue_mdl: ipt_mapp}],
            function(result) {
              // var hotelsFromDom = result.value;
              // client.globals.frontEndHotels = result.value;
              // console.log(client.globals.frontEndHotels);
            })
            /**/
            
            /* input one by one is too slow *-/
            for (var key in in_obj) {
              if ('martial_status' === key) {
                ird_browser = ird_browser
                  .click('input[value="' + in_obj[key] + '"]')
              } else {
                ird_browser = ird_browser
                  .clearValue(ipt_mapp[key])
                  .setValue(ipt_mapp[key], in_obj[key])
              }
            }
            /-* */

            ird_browser
            .click('#ComputeButton')
            // .pause(30000)
            .waitForElementVisible('table[border="1"]', 1600)
            // .elements('css selector', 'table[border="1"] > tbody > tr:last-child td', function(result0){
              // els = result0.value;
              // browser
                // .assert.equal(els.length, 2)
            // })
            .useXpath()
            .elements('xpath', '//td[text()="總 免 稅 額"]/following-sibling::*', function(result0){
              els = result0.value;
              var param = ' #NBbb: ' + in_obj['#NBbb'] +
              ' #NBbb_DIS: ' + in_obj['#NBbb_DIS'] +
              ' #CAbb: ' + in_obj['#CAbb'] +
              ' #CAbb_DIS: ' + in_obj['#CAbb_DIS'] +
              ' #single_parent: ' + in_obj['#single_parent'] +
              ' #brosis_dep: ' + in_obj['#brosis_dep'] +
              ' #brosis_dep_DIS: ' + in_obj['#brosis_dep_DIS'] +
              ' #resi_parent: ' + in_obj['#resi_parent'] +
              ' #resi_parent_DIS: ' + in_obj['#resi_parent_DIS'] +
              ' #non_resi_parent: ' + in_obj['#non_resi_parent'] +
              ' #non_resi_parent_DIS: ' + in_obj['#non_resi_parent_DIS'] +
              ' #resi_parent_5560: ' + in_obj['#resi_parent_5560'] +
              ' #non_resi_parent_5560: ' + in_obj['#non_resi_parent_5560'] +
              ' #spouse_disabled_dependent_DIS: ' + in_obj['#spouse_disabled_dependent_DIS']
              
              var idx = 0
              console.log('param: ' + param)
              els.forEach(function(element0) {
                browser.elementIdText(element0.ELEMENT, function(result1){
                  console.log('IRD idx: ' + idx)
                  browser.assert.equal(result1.value.trim().replace(/,/g, ''), out_obj[idx], param)
                  idx++
                })
              })

            })
          });
        })
        // .pause(50000)
        // .end()
    }
    
    for_browser = browser
    
    
    var range4 = []
    var range9 = []
    var m_status = ['S', 'M']
    
    for (var idx = 0; idx < 5; idx++) {
      range4.push(idx)
    }
    for (var idx = 0; idx < 10; idx++) {
      range9.push(idx)
    }
    // LOOP only for 總 免 稅 額
    var NBbb =
        NBbb_DIS =
        CAbb =
        CAbb_DIS =
        single_parent =
        brosis_dep =
        brosis_dep_DIS =
        resi_parent =
        resi_parent_DIS =
        non_resi_parent =
        non_resi_parent_DIS =
        resi_parent_5560 =
        non_resi_parent_5560 =
        spouse_disabled_dependent_DIS = 0;
    /*
    // for (var spouse_oe = 0; spouse_oe < 11; spouse_oe = spouse_oe + 1000) {
    // for (var self_oe = 0; self_oe < 11; self_oe = self_oe + 1000) {
    // for (var spouse_income = 0; spouse_income < 10; spouse_income++) {
    // for (var self_income = 0; self_income < 10; self_income++) {
    */
    // for (var single_parent = 0; single_parent < 2; single_parent++) {

    // for (non_resi_parent_DIS = 0; non_resi_parent_DIS < 5; non_resi_parent_DIS++) {
    // for (resi_parent_DIS = 0; resi_parent_DIS < 5; resi_parent_DIS++) {
    // for (brosis_dep_DIS = 0; brosis_dep_DIS < 5; brosis_dep_DIS++) {
    // for (CAbb_DIS = 0; CAbb_DIS < 10; CAbb_DIS++) {
    // for (NBbb_DIS = 0; NBbb_DIS < 10; NBbb_DIS++) {
      
    // for (non_resi_parent_5560 = 0; non_resi_parent_5560 < 5; non_resi_parent_5560++) {
    // for (resi_parent_5560 = 0; resi_parent_5560 < 5; resi_parent_5560++) {
    // for (non_resi_parent = 0; non_resi_parent < 5; non_resi_parent++) {
    // for (resi_parent = 0; resi_parent < 5; resi_parent++) {
    // for (brosis_dep = 0; brosis_dep < 10; brosis_dep++) {
    // for (CAbb = 0; CAbb < 10; CAbb++) {
    // for (NBbb = 0; NBbb < 10; NBbb++) {
    
    range4.map(function (non_resi_parent_DIS) {
    range4.map(function (resi_parent_DIS) {
    range4.map(function (brosis_dep_DIS) {
    range9.map(function (CAbb_DIS) {
    range9.map(function (NBbb_DIS) {
    
    range4.map(function (non_resi_parent_5560) {
    range4.map(function (resi_parent_5560) {
    range4.map(function (non_resi_parent) {
    range4.map(function (resi_parent) {
    range9.map(function (brosis_dep) {
    
    range9.map(function (CAbb) {
    range9.map(function (NBbb) {
    for (spouse_disabled_dependent_DIS = 1; spouse_disabled_dependent_DIS < 2; spouse_disabled_dependent_DIS++) {
      var in_obj = {
        'martial_status': 'M',
        '#self_income': '' + 800000,
        '#spouse_income': '' + 600000,
        '#self_residence': '0',
        '#spouse_residence': '0',
        '#self_oe': '' + 0,
        '#spouse_oe': '' + 0,
        '#self_eduexp': '0',
        '#spouse_eduexp': '0',
        '#self_donation': '0',
        '#spouse_donation': '0',
        '#self_mpf': '0',
        '#spouse_mpf': '0',
        '#self_homeloan': '0',
        '#spouse_homeloan': '0',
        '#self_eldresi_amt': '0',
        '#spouse_eldresi_amt': '0',

        '#self_elderly': '0',
        '#spouse_elderly': '0',
        '#self_disabledep': '0',
        '#spouse_disabledep': '0',
        '#NBbb': '' + NBbb,
        '#NBbb_DIS': '' + NBbb_DIS,
        '#CAbb': '' + CAbb,
        '#CAbb_DIS': '' + CAbb_DIS,
        '#single_parent': '' + single_parent,
        '#brosis_dep': '' + brosis_dep,
        '#brosis_dep_DIS': '' + brosis_dep_DIS,
        '#resi_parent': '' + resi_parent,
        '#resi_parent_DIS': '' + resi_parent_DIS,
        '#non_resi_parent': '' + non_resi_parent,
        '#non_resi_parent_DIS': '' + non_resi_parent_DIS,
        '#resi_parent_5560': '' + resi_parent_5560,
        '#non_resi_parent_5560': '' + non_resi_parent_5560,
        '#spouse_disabled_dependent_DIS': '' + spouse_disabled_dependent_DIS
      }
      do_vue(for_browser, in_obj, function (obj) {
        for_browser = do_ird(obj)
      })
    }
    // }
    // }
    
    // }
    // }
    // }
    // }
    // }
    
    // }
    // }
    // }
    // }
    // }
    })
    })
    
    })
    })
    })
    })
    })
    
    })
    })
    })
    })
    })
    
    // }

    
    
    for_browser
      .end()
/* - */
  }
  // ,
  // 'test 2':  function (browser) {
    // browser
      // .end()
  // }
}
