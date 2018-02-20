<template>
  <div class="hello">
    <div class="wrapper">
      <h2>[Input] taxtype: {{ STCMainRV }} - 有傷殘： {{ STCIn8 }}</h2>
      <div class="slider_cont">

        <div class="a_slide">
          <p>單身／已婚</p>

          <div class="a__option col-xs-6">
            <input type="radio" :id="'mtr' + 0" value="S" v-model="martial_status" vX-on:change="chg_method">
            <label :class="{'active': 'mtr' === 0}" :for="'mtr' + 0">單身</label>
          </div>

          <div class="a__option col-xs-6">
            <input type="radio" :id="'bus' + 0" value="M" v-model="martial_status" vX-on:change="chg_method">
            <label :class="{'active': 'bus' === 0}" :for="'bus' + 0">已婚</label>
          </div>
        </div>

        <!--
        <div class="a_slide">
          <label for="joint">合拼計算</label>
          <input id="joint" type="checkbox" v-model="joint" />
        </div>
        -->

        <div class="a_slide">
          <label for="self_income">本人-入息</label>
          <input id="self_income" type="text" v-model="slfIncome" />
          <br>
          <label for="spouse_income">配偶-入息</label>
          <input id="spouse_income" type="text" v-model="spsIncome" />
        </div>

        <div class="a_slide">
          <label for="self_residence">本人-獲僱主或相聯公司提供居所的租值</label>
          <input id="self_residence" type="text" v-model="slfResi" />
          <br>
          <label for="spouse_residence">配偶-獲僱主或相聯公司提供居所的租值</label>
          <input id="spouse_residence" type="text" v-model="spsResi" />
        </div>
        
        <div class="a_slide">
          <h2>扣除</h2>
          <label for="self_oe">本人-支出及開支</label>
          <input id="self_oe" type="text" v-model="slfOE" /> <!-- slfExp -->
          <br>
          <label for="spouse_oe">配偶-支出及開支</label>
          <input id="spouse_oe" type="text" v-model="spsOE" />
        </div>
        
        <div class="a_slide">
          <label for="self_eduexp">本人-個人進修開支</label>
          <input id="self_eduexp" type="text" v-model="slfSEE" /> <!-- slfEdu -->
          <br>
          <label for="spouse_eduexp">配偶-個人進修開支</label>
          <input id="spouse_eduexp" type="text" v-model="spsSEE" />
        </div>
        
        <div class="a_slide">
          <label for="self_donation">本人-認可慈善捐款</label>
          <input id="self_donation" type="text" v-model="slfDona" />
          <br>
          <label for="spouse_donation">配偶-認可慈善捐款</label>
          <input id="spouse_donation" type="text" v-model="spsDona" />
        </div>
        
        <div class="a_slide">
          <label for="self_mpf">本人-MPF</label>
          <input id="self_mpf" type="text" v-model="slfMpf" />
          <br>
          <label for="spouse_mpf">配偶-MPF</label>
          <input id="spouse_mpf" type="text" v-model="spsMpf" />
        </div>
        
        <div class="a_slide">
          <label for="self_homeloan">本人-居所貸款利息</label>
          <input id="self_homeloan" type="text" v-model="slfLoan" />
          <br>
          <label for="spouse_homeloan">配偶-居所貸款利息</label>
          <input id="spouse_homeloan" type="text" v-model="spsLoan" />
        </div>
        
        <div class="a_slide">
          <h2>長者住宿照顧</h2>
          <label for="self_elderly">本人-在安老院居住的受養人數目</label>
          <input id="self_elderly" type="text" v-model="slfElder" />
          <br>
          <label for="self_disabledep">本人-傷殘受養人免稅額資格的受養人數目</label>
          <input id="self_disabledep" type="text" v-model="slfDisdep" />
          <br>
          <label for="self_eldresi_amt">本人-支付給安老院的開支款額</label>
          <input id="self_eldresi_amt" type="text" v-model="slfERCE" />
          <br>
          
          <label for="spouse_elderly">配偶-在安老院居住的受養人數目</label>
          <input id="spouse_elderly" type="text" v-model="spsElder" />
          <br>
          <label for="spouse_disabledep">配偶-傷殘受養人免稅額資格的受養人數目</label>
          <input id="spouse_disabledep" type="text" v-model="spsDisdep" />
          <br>
          <label for="spouse_eldresi_amt">配偶-支付給安老院的開支款額</label>
          <input id="spouse_eldresi_amt" type="text" v-model="spsERCE" />
        </div>

        <hr>


        <div class="a_slide">
          <h2>受養人</h2>
          <label for="NBbb">在課稅年度內出生子女（名）</label><input id="NBbb" type="text" v-model="NBbb" v-on:change="D3aOnChange()" /> <!--  STCIn21 -->
          <label for="CAbb">在其他課稅年度出生的子女（名）</label><input id="CAbb" type="text" v-model="CAbb" v-on:input="D3OnChange()" /> <!--   STCIn4 -->
          <br>
          <label for="single_parent">單親免稅額</label><input id="single_parent" type="text" v-model="single_parent" /> <!--  STCIn23 -->
          <label for="brosis_dep">供養兄弟/姊妹</label><input id="brosis_dep" type="text" v-model="brosis_dep" v-on:change="D5OnChange()" /> <!--   STCIn5 -->
          <br>
          <p>供養全年與你同住的年滿60歲或以上的父母/祖父母或外祖父母</p>
          <label for="resi_parent">全年與你同住</label><input id="resi_parent" type="text" v-model="resi_parent" v-on:change="D7OnChange()" /> <!--   STCIn6 -->
          <label for="non_resi_parent">並非全年與你同住</label><input id="non_resi_parent" type="text" v-model="non_resi_parent" v-on:change="D9OnChange()" /> <!--   STCIn7 -->
          <br>
          <p>供養全年與你同住的年滿55歲但未滿60歲的父母/祖父母或外祖父母</p>
          <label for="resi_parent_5560">全年與你同住</label><input id="resi_parent_5560" type="text" v-model="resi_parent_5560" /> <!--  STCIn17 -->
          <label for="non_resi_parent_5560">並非全年與你同住</label><input id="non_resi_parent_5560" type="text" v-model="non_resi_parent_5560" /> <!--  STCIn18 -->
        </div>


        <div class="a_slide">
          <h2>受養人-傷殘</h2>
          <label for="NBbb_DIS">在課稅年度內出生子女（名）</label><input id="NBbb_DIS" type="text" v-model="NBbb_DIS" v-on:change="D4aOnChange()" /> <!--  STCIn10 -->
          <label for="CAbb_DIS">在其他課稅年度出生的子女（名）</label><input id="CAbb_DIS" type="text" v-model="CAbb_DIS" v-on:change="D4OnChange()" /> <!--  STCIn22 -->
          <br>
          <label for="brosis_dep_DIS">供養兄弟/姊妹</label><input id="brosis_dep_DIS" type="text" v-model="brosis_dep_DIS" v-on:change="D6OnChange()" /> <!--  STCIn11 -->
          <br>
          <p>供養全年與你同住的年滿60歲或以上的父母/祖父母或外祖父母</p>
          <label for="resi_parent_DIS">全年與你同住</label><input id="resi_parent_DIS" type="text" v-model="resi_parent_DIS" v-on:change="D8OnChange()" /> <!--  STCIn12 -->
          <label for="non_resi_parent_DIS">並非全年與你同住</label><input id="non_resi_parent_DIS" type="text" v-model="non_resi_parent_DIS" v-on:change="D10OnChange()" /> <!--  STCIn13 -->
          <br>
          <label for="spouse_disabled_dependent_DIS">傷殘配偶受養人</label>
          <input id="spouse_disabled_dependent_DIS" type="text" v-model="spouse_disabled_dependent_DIS" /> <!--  STCIn9 -->
        </div>
        
      </div>
      <hr>

      <h2>Output</h2>
      <table border="1" width="100%">
          <tbody>
              <tr>
                  <td width="46%">總 入 息</td>
                  <td width="18%" v-if="STCMainRV !== 24">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tbody>
                              <tr>
                                  <td width="75%" align="right" class="formulated">{{ STCOut1[0] }}</td>
                                  <td width="25%" align="center">&nbsp;</td>
                              </tr>
                          </tbody>
                      </table>
                  </td>
                  <td width="18%" v-if="STCMainRV !== 22 && STCMainRV !== 10">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tbody>
                              <tr>
                                  <td width="75%" align="right" class="formulated">{{ STCOut1[1] }}</td>
                                  <td width="25%" align="center">&nbsp;</td>
                              </tr>
                          </tbody>
                      </table>
                  </td>
                  <td width="18%" v-if="STCMainRV !== 24 && STCMainRV !== 22 && STCMainRV !== 10" align="right" class="formulated">{{ STCOut1[2] }}</td>
              </tr>
              <tr>
                  <td width="46%">扣 除 額</td>
                  <td width="18%" v-if="STCMainRV !== 24">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tbody>
                              <tr>
                                  <td width="75%" align="right" class="formulated">{{ STCOut1[57] }}</td>
                                  <td width="25%" align="center">&nbsp;</td>
                              </tr>
                          </tbody>
                      </table>
                  </td>
                  <td width="18%" v-if="STCMainRV !== 22 && STCMainRV !== 10">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tbody>
                              <tr>
                                  <td width="75%" align="right" class="formulated">{{ STCOut1[58] }}</td>
                                  <td width="25%" align="center">&nbsp;</td>
                              </tr>
                          </tbody>
                      </table>
                  </td>
                  <td width="18%" v-if="STCMainRV !== 24 && STCMainRV !== 22 && STCMainRV !== 10" align="right" class="formulated">{{ STCOut1[59] }}</td>
              </tr>
              <tr>
                  <td width="100%" colspan="4">免 稅 額：－</td>
              </tr>
              <tr>
                  <td width="46%" v-if="STCMainRV !== 24 && STCMainRV !== 22 && STCMainRV !== 10">&nbsp;&nbsp;&nbsp;&nbsp;基 本 / 已 婚 人 士</td>
                  <td width="46%" v-if="STCMainRV === 24 || STCMainRV === 22">&nbsp;&nbsp;&nbsp;&nbsp;已 婚 人 士</td>
                  <td width="46%" v-if="STCMainRV === 10">&nbsp;&nbsp;&nbsp;&nbsp;基 本</td>                  
                  <td width="18%" v-if="STCMainRV !== 24 && STCMainRV !== 22">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tbody>
                              <tr>
                                  <td width="75%" align="right" class="formulated">{{ STCOut1[3] }}</td>
                                  <td width="25%" align="center">&nbsp;</td>
                              </tr>
                          </tbody>
                      </table>
                  </td>
                  <td width="18%" v-if="STCMainRV !== 24 && STCMainRV !== 22 && STCMainRV !== 10">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tbody>
                              <tr>
                                  <td width="75%" align="right" class="formulated">{{ STCOut1[3] }}</td>
                                  <td width="25%" align="center">&nbsp;</td>
                              </tr>
                          </tbody>
                      </table>
                  </td>
                  <td width="18%" v-if="STCMainRV === 24 || STCMainRV === 22 || STCMainRV === 30 || STCMainRV === 40 || STCMainRV === 42 || STCMainRV === 45" align="right" class="formulated">{{ STCOut1[4] }}&nbsp;&nbsp;&nbsp;</td>
              </tr>
              <tr v-if="STCMainRV === 10">
                  <td width='80%'>&nbsp;&nbsp;&nbsp;&nbsp;單 親</td>
                  <td width='20%' align='right'>
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tbody>
                              <tr>
                                  <td width="75%" align="right" class="formulated">{{ STCOut1[5] }}</td>
                                  <td width="25%" align="center">&nbsp;</td>
                              </tr>
                          </tbody>
                      </table>
                  </td>
              </tr>
              <!-- Single Column + 1row -->
              <tr v-if="(STCOut1[77] === 0 && STCOut1[76] === 0) && (STCMainRV === 24 || STCMainRV === 22 || STCMainRV === 10)">
                  <td width='80%'>&nbsp;&nbsp;&nbsp;&nbsp;子 女</td>
                  <td width='20%' v-if="STCMainRV === 22 || STCMainRV === 10" align='right' class="formulated">{{ STCOut1[6] }}</td>
                  <td width='20%' v-if="STCMainRV === 24" align='right' class="formulated">{{ STCOut1[12] }}</td>
              </tr>
              <!-- Single Column + 3row -->
              <tr v-if="(STCOut1[77] > 0 || STCOut1[76] > 0) && (STCMainRV === 24 || STCMainRV === 22 || STCMainRV === 10)">
                  <td width="46%">&nbsp;&nbsp;&nbsp;&nbsp;子 女</td>
                  <td width="18%">&nbsp;</td>
              </tr>
              <tr v-if="STCOut1[77] > 0 || STCOut1[76] > 0 && (STCMainRV === 24 || STCMainRV === 22 || STCMainRV === 10)">
                  <td width="46%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 在 課 稅 年 度 內 出 生</td>
                  <td width='20%' v-if="STCMainRV === 22 || STCMainRV === 10" align='right' class="formulated">{{ STCOut1[73] }}</td>
                  <td width='20%' v-if="STCMainRV === 24" align='right' class="formulated">{{ STCOut1[74] }}</td>
              </tr>
              <tr v-if="STCOut1[77] > 0 || STCOut1[76] > 0 && (STCMainRV === 24 || STCMainRV === 22 || STCMainRV === 10)">
                  <td width="46%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 在 其 他 課 稅 年 度 出 生</td>
                  <td width='20%' v-if="STCMainRV === 22 || STCMainRV === 10" align='right' class="formulated">{{ STCOut1[6] }}</td>
                  <td width='20%' v-if="STCMainRV === 24" align='right' class="formulated">{{ STCOut1[12] }}</td>
              </tr>
              <!-- Multi Column + 1row -->
              <tr v-if="(STCOut1[77] === 0 && STCOut1[76] === 0) && (STCMainRV === 30 || STCMainRV === 40 || STCMainRV === 42 || STCMainRV === 45)">
                  <td width='46%'>&nbsp;&nbsp;&nbsp;&nbsp;子 女 [nMin: {{nMin}}] - [STCIn21: {{STCIn21}} ] - [STCOut1[12]: {{STCOut1[12]}} ] - [STCIn4: {{STCIn4}}]</td>
                  <!-- cell left -->
                  <td width="18%">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tbody>
                              <tr>
                                  <td width="75%" v-if="STCMainRV === 30 || STCMainRV === 40" align="right" class="formulated" data-taxtype="{}">{{ STCOut1[6] }}</td>
                                  <td width="75%" v-if="STCMainRV === 42" align="right" class="formulated" data-taxtype="{}">0</td>
                                  <td width="75%" v-if="STCMainRV === 45" align="right" class="formulated" data-taxtype="{}">(0)</td>
                                  <td width="25%" v-if="STCMainRV === 30" align="center">
                                      <font color="#FF0000">({{ STCOut1[37] }})</font>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </td>
                  <!-- cell middle -->
                  <td width="18%">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tbody>
                              <tr>
                                  <td width="75%" v-if="STCMainRV === 30 || STCMainRV === 40" align="right" class="formulated" data-taxtype="{}">{{ STCOut1[12] }}</td>
                                  <td width="75%" v-if="STCMainRV === 42 || STCMainRV === 45" align="right" class="formulated" data-taxtype="{}">{{ STCOut1[18] }}</td>
                                  <td width="25%" v-if="STCMainRV === 30 || STCMainRV === 45" align="center">
                                      <font v-if="STCMainRV === 30" color="#FF0000">({{ STCOut1[41] }})</font>
                                      <font v-if="STCMainRV === 45" color="#FF0000">({{ STCOut1[37] + STCOut1[41] }})</font>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </td>
                  <!-- cell right -->
                  <td width="18%" align="right" class="formulated" data-taxtype="{}">{{ STCOut1[18] }}</td>
              </tr>



              <!-- Multi Column + 3row -->
              <tr v-if="(STCOut1[77] > 0 || STCOut1[76] > 0) && (STCMainRV === 30 || STCMainRV === 40 || STCMainRV === 42 || STCMainRV === 45)">
                  <td width='46%'>&nbsp;&nbsp;&nbsp;&nbsp;子 女</td>
                  <td width="18%">&nbsp;</td>
                  <td width="18%">&nbsp;</td>
                  <td width="18%">&nbsp;</td>
              </tr>
              <tr v-if="(STCOut1[77] > 0 || STCOut1[76] > 0) && (STCMainRV === 30 || STCMainRV === 40 || STCMainRV === 42 || STCMainRV === 45)">
                  <td width="46%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 在 課 稅 年 度 內 出 生</td>
                  <td width="18%">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tbody>
                              <tr>
                                  <td width="75%" v-if="STCMainRV === 30 || STCMainRV === 40" align="right" class="formulated" data-taxtype="{}">{{ STCOut1[73] }}</td>
                                  <td width="75%" v-if="STCMainRV === 42 || STCMainRV === 45" align="right" class="formulated" data-taxtype="{}">(0)</td>
                                  <td width="25%" align="center" v-if="STCMainRV !== 10">
                                      <font v-if="STCMainRV === 30" color="#FF0000">({{ STCOut1[76] }})</font>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </td>
                  <td width="18%">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tbody>
                              <tr>
                                  <td width="75%" v-if="STCMainRV === 30 || STCMainRV === 40" align="right" class="formulated" data-taxtype="{}">{{ STCOut1[74] }}</td>
                                  <td width="75%" v-if="STCMainRV === 42 || STCMainRV === 45" align="right" class="formulated" data-taxtype="{}">{{ STCOut1[75] }}</td>
                                  <td width="25%" align="center" v-if="STCMainRV !== 10">
                                      <font v-if="STCMainRV === 30" color="#FF0000">({{ STCOut1[77] }})</font>
                                      <font v-if="STCMainRV === 45" color="#FF0000">({{ STCOut1[76] + STCOut1[77] }})</font>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </td>
                  <td width="18%" align="right" class="formulated" data-taxtype="{}">{{ STCOut1[75] }}</td>
              </tr>
              <tr v-if="(STCOut1[77] > 0 || STCOut1[76] > 0) && (STCMainRV === 30 || STCMainRV === 40 || STCMainRV === 42 || STCMainRV === 45)">
                  <td width="46%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 在 其 他 課 稅 年 度 出 生</td>
                  <td width="18%">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tbody>
                              <tr>
                                  <td width="75%" v-if="STCMainRV === 30 || STCMainRV === 40" align="right" class="formulated" data-taxtype="{}">{{ STCOut1[6] }}</td>
                                  <td width="75%" v-if="STCMainRV === 42 || STCMainRV === 45" align="right" class="formulated" data-taxtype="{}">(0)</td>
                                  <td width="25%" align="center" v-if="STCMainRV !== 10">
                                      <font v-if="STCMainRV === 30" color="#FF0000">({{ STCOut1[37] }})</font>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </td>
                  <td width="18%">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tbody>
                              <tr>
                                  <td width="75%" v-if="STCMainRV === 30 || STCMainRV === 40" align="right" class="formulated" data-taxtype="{}">{{ STCOut1[12] }}</td>
                                  <td width="75%" v-if="STCMainRV === 42 || STCMainRV === 45" align="right" class="formulated" data-taxtype="{}">{{ STCOut1[18] }}</td>
                                  <td width="25%" align="center" v-if="STCMainRV !== 10">
                                      <font v-if="STCMainRV === 30" color="#FF0000">({{ STCOut1[41] }})</font>
                                      <font v-if="STCMainRV === 45" color="#FF0000">({{ STCOut1[37] + STCOut1[41] }})</font>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </td>
                  <td width="18%" align="right" class="formulated" data-taxtype="{}">{{ STCOut1[18] }}</td>
              </tr>

              <!-- Single Column -->
              <tr v-if="STCMainRV === 24 || STCMainRV == 22 || STCMainRV == 10">
                  <td width='80%'>&nbsp;&nbsp;&nbsp;&nbsp;供 養 兄 弟 / 姊 妹</td>
                  <td width='20%' v-if="STCMainRV !== 24" align='right'>{{ STCOut1[7] }}</td>
                  <td width='20%' v-if="STCMainRV === 24" align='right'>{{ STCOut1[13] }}</td>
              </tr>
              <!-- Multi Column -->
              <tr v-if="STCMainRV === 30 || STCMainRV == 40 || STCMainRV == 42 || STCMainRV == 45">
                  <td width="46%">&nbsp;&nbsp;&nbsp;&nbsp;供 養 兄 弟 / 姊 妹 [oMin: {{ oMin }} ][STCIn5: {{ STCIn5 }}]</td>
                  <!-- cell left -->
                  <td width="18%">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tbody>
                              <tr>
                                  <td width="75%" v-if="STCMainRV === 30 || STCMainRV === 40" align="right" class="formulated">{{ STCOut1[7] }}</td>
                                  <td width="75%" v-if="STCMainRV === 42" align="right" class="formulated">{{ STCOut1[3] }}</td>
                                  <td width="75%" v-if="STCMainRV === 45" align="right" class="formulated">0</td>
                                  <td width="25%" align="center">
                                      <font v-if="STCMainRV === 30" color="#FF0000">({{ STCOut1[38] }})</font>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </td>
                  <!-- cell mid -->
                  <td width="18%">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tbody>
                              <tr>
                                  <td width="75%" v-if="STCMainRV === 30 || STCMainRV === 40" align="right" class="formulated" data-taxtype="{}">{{ STCOut1[13] }}</td>
                                  <td width="75%" v-if="STCMainRV === 42 || STCMainRV === 45" align="right" class="formulated" data-taxtype="{}">{{ STCOut1[19] }}</td>
                                  <td width="25%" align="center">
                                      <font v-if="STCMainRV === 30" color="#FF0000">({{ STCOut1[42] }})</font>
                                      <font v-if="STCMainRV === 45" color="#FF0000">({{ STCOut1[38] + STCOut1[42] }})</font>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </td>
                  <!-- cell right -->
                  <td width="18%" align="right" class="formulated" data-taxtype="{}">{{ STCOut1[19] }}</td>
              </tr>


              <!-- Single Column -->
              <tr v-if="STCMainRV === 24 || STCMainRV === 22 || STCMainRV === 10">
                  <td width='80%'>&nbsp;&nbsp;&nbsp;&nbsp;供 養 父 母 / 祖 父 母 或 外 祖 父 母</td>
                  <td width='20%' align='right'>&nbsp;</td>
              </tr>
              <tr v-if="STCMainRV === 24 || STCMainRV === 22 || STCMainRV === 10">
                  <td width='80%'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 年 齡 為 55 至 59 歲</td>
                  <td width='20%' v-if="STCMainRV !== 24" align='right'>{{ STCOut1[60] }}</td>
                  <td width='20%' v-if="STCMainRV === 24" align='right'>{{ STCOut1[63] }}</td>
              </tr>
              <tr v-if="STCMainRV === 24 || STCMainRV === 22 || STCMainRV === 10">
                  <td width='80%'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 年 滿 60 歲 或 以 上 ， 或 雖 未 滿 60 歲 ， 但 屬 傷 殘 人 士</td>
                  <td width='20%' v-if="STCMainRV !== 24" align='right'>{{ STCOut1[8] }}</td>
                  <td width='20%' v-if="STCMainRV === 24" align='right'>{{ STCOut1[14] }}</td>
              </tr>

              <!-- Multi Column -->
              <tr v-if="STCMainRV !== 24 && STCMainRV !== 22 && STCMainRV !== 10">
                  <td width="46%">&nbsp;&nbsp;&nbsp;&nbsp;全 年 與 你 同 住 的<br>&nbsp;&nbsp;&nbsp;&nbsp;受 養 父 母 / 祖 父 母 或<br>&nbsp;&nbsp;&nbsp;&nbsp;外 祖 父 母</td>
                  <td width="18%">&nbsp;</td>
                  <td width="18%">&nbsp;</td>
                  <td width="18%">&nbsp;</td>
              </tr>
              <tr v-if="STCMainRV !== 24 && STCMainRV !== 22 && STCMainRV !== 10">
                  <td width="46%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 年 齡 為 55 至 59 歲</td>
                  <td width="18%">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tbody>
                              <tr>
                                  <td width="75%" v-if="STCMainRV === 30 || STCMainRV === 40" align="right" class="formulated">{{ STCOut1[61] }}</td>
                                  <td width="75%" v-if="STCMainRV === 42" align="right" class="formulated">0</td>
                                  <td width="75%" v-if="STCMainRV === 45" align="right" class="formulated">(0)</td>
                                  <td width="25%" align="center">
                                      <font color="#FF0000" v-if="STCMainRV === 30">({{ STCOut1[69] }})</font>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </td>
                  <td width="18%">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tbody>
                              <tr>
                                  <td width="75%" v-if="STCMainRV === 30 || STCMainRV === 40" align="right" class="formulated">{{ STCOut1[64] }}</td>
                                  <td width="75%" v-if="STCMainRV === 42" align="right" class="formulated">0</td>
                                  <td width="75%" v-if="STCMainRV === 45" align="right" class="formulated">(0)</td>
                                  <td width="25%" align="center">
                                      <font color="#FF0000" v-if="STCMainRV === 30">({{ STCOut1[71] }})</font>
                                      <font color="#FF0000" v-if="STCMainRV === 45">({{ STCOut1[69] + STCOut1[71] }})</font>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </td>
                  <td width="18%" align="right" class="formulated" data-taxtype="{}">{{ STCOut1[67] }}</td>
              </tr>
              <tr v-if="STCMainRV !== 24 && STCMainRV !== 22 && STCMainRV !== 10">
                  <td width="46%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 年 滿 60 歲 或 以 上 ， 或 雖<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;未 滿 60 歲 ， 但 屬 傷 殘 人 士</td>
                  <td width="18%">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tbody>
                              <tr>
                                  <td width="75%" v-if="STCMainRV === 30 || STCMainRV === 40" align="right" class="formulated">{{ STCOut1[9] }}</td>
                                  <td width="75%" v-if="STCMainRV === 42" align="right" class="formulated">0</td>
                                  <td width="75%" v-if="STCMainRV === 45" align="right" class="formulated">(0)</td>
                                  <td width="25%" align="center">
                                      <font color="#FF0000" v-if="STCMainRV === 30">({{ STCOut1[39] }})</font>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </td>
                  <td width="18%">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tbody>
                              <tr>
                                  <td width="75%" v-if="STCMainRV === 30 || STCMainRV === 40" align="right" class="formulated">{{ STCOut1[15] }}</td>
                                  <td width="75%" v-if="STCMainRV === 42 || STCMainRV === 45" align="right" class="formulated">{{ STCOut1[21] }}</td>
                                  <td width="25%" align="center">
                                      <font color="#FF0000" v-if="STCMainRV === 30">({{ STCOut1[43] }})</font>
                                      <font color="#FF0000" v-if="STCMainRV === 45">({{ STCOut1[39] + STCOut1[43] }})</font>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </td>
                  <td width="18%" align="right" class="formulated" data-taxtype="{}">{{ STCOut1[21] }}</td>
              </tr>
              <tr v-if="STCMainRV !== 24 && STCMainRV !== 22 && STCMainRV !== 10">
                  <td width="46%">&nbsp;&nbsp;&nbsp;&nbsp;並 非 全 年 與 你 同 住 的<br>&nbsp;&nbsp;&nbsp;&nbsp;受 養 父 母 / 祖 父 母 或<br>&nbsp;&nbsp;&nbsp;&nbsp;外 祖 父 母</td>
                  <td width="18%">&nbsp;</td>
                  <td width="18%">&nbsp;</td>
                  <td width="18%">&nbsp;</td>
              </tr>
              <tr v-if="STCMainRV !== 24 && STCMainRV !== 22 && STCMainRV !== 10">
                  <td width="46%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 年 齡 為 55 至 59 歲</td>
                  <td width="18%">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tbody>
                              <tr>
                                  <td width="75%" v-if="STCMainRV === 30 || STCMainRV === 40" align="right" class="formulated">{{ STCOut1[62] }}</td>
                                  <td width="75%" v-if="STCMainRV === 42" align="right" class="formulated">0</td>
                                  <td width="75%" v-if="STCMainRV === 45" align="right" class="formulated">(0)</td>
                                  <td width="25%" align="center">
                                      <font color="#FF0000" v-if="STCMainRV === 30">({{ STCOut1[70] }})</font>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </td>
                  <td width="18%">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tbody>
                              <tr>
                                  <td width="75%" v-if="STCMainRV === 30 || STCMainRV === 40" align="right" class="formulated">{{ STCOut1[65] }}</td>
                                  <td width="75%" v-if="STCMainRV === 42 || STCMainRV === 45" align="right" class="formulated">{{ STCOut1[68] }}</td>
                                  <td width="25%" align="center">
                                      <font color="#FF0000" v-if="STCMainRV === 30">({{ STCOut1[72] }})</font>
                                      <font color="#FF0000" v-if="STCMainRV === 45">({{ STCOut1[70] + STCOut1[72] }})</font>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </td>
                  <td width="18%" align="right" class="formulated" data-taxtype="{}">{{ STCOut1[68] }}</td>
              </tr>
              <tr v-if="STCMainRV !== 24 && STCMainRV !== 22 && STCMainRV !== 10">
                  <td width="46%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 年 滿 60 歲 或 以 上 ， 或 雖<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;未 滿 60 歲 ， 但 屬 傷 殘 人 士</td>
                  <td width="18%">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tbody>
                              <tr>
                                  <td width="75%" v-if="STCMainRV === 30 || STCMainRV === 40" align="right" class="formulated">{{ STCOut1[10] }}</td>
                                  <td width="75%" v-if="STCMainRV === 42" align="right" class="formulated">0</td>
                                  <td width="75%" v-if="STCMainRV === 45" align="right" class="formulated">(0)</td>
                                  <td width="25%" align="center">
                                      <font color="#FF0000" v-if="STCMainRV === 30">({{ STCOut1[40] }})</font>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </td>
                  <td width="18%">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tbody>
                              <tr>
                                  <td width="75%" v-if="STCMainRV === 30 || STCMainRV === 40" align="right" class="formulated">{{ STCOut1[16] }}</td>
                                  <td width="75%" v-if="STCMainRV === 42 || STCMainRV === 45" align="right" class="formulated">{{ STCOut1[68] }}</td>
                                  <td width="25%" align="center">
                                      <font color="#FF0000" v-if="STCMainRV === 30">({{ STCOut1[44] }})</font>
                                      <font color="#FF0000" v-if="STCMainRV === 45">({{ STCOut1[40] + STCOut1[44] }})</font>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </td>
                  <td width="18%" align="right" class="formulated" data-taxtype="{}">{{ STCOut1[22] }}</td>
              </tr>

              <!-- Single Column -->
              <tr v-if="STCMainRV === 24 || STCMainRV == 22 || STCMainRV == 10">
                  <td width='80%'>&nbsp;&nbsp;&nbsp;&nbsp;傷 殘 受 養 人</td>
                  <td width='20%' v-if="STCMainRV !== 24" align='right'>{{ STCOut1[11] }}</td>
                  <td width='20%' v-if="STCMainRV === 24" align='right'>{{ STCOut1[17] }}</td>
              </tr>


              <!-- Multi Column -->
              <tr v-if="STCMainRV === 30 || STCMainRV == 40 || STCMainRV == 42 || STCMainRV == 45">
                  <td width="46%">&nbsp;&nbsp;&nbsp;&nbsp;傷 殘 受 養 人</td>
                  <!-- cell left -->
                  <td width="18%">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tbody>
                              <tr>
                                  <td width="75%" v-if="STCMainRV === 30 || STCMainRV === 40" align="right" class="formulated">{{ STCOut1[11] }}</td>
                                  <td width="75%" v-if="STCMainRV === 42" align="right" class="formulated">0</td>
                                  <td width="75%" v-if="STCMainRV === 45" align="right" class="formulated">0</td>
                                  <td width="25%" align="center">
                                      <font v-if="STCMainRV === 30" color="#FF0000">({{ STCOut1[49] }})</font>
                                      <font v-if="STCMainRV === 45" color="#FF0000">(0)</font>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </td>
                  <!-- cell mid -->
                  <td width="18%">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tbody>
                              <tr>
                                  <td width="75%" v-if="STCMainRV === 30 || STCMainRV === 40" align="right" class="formulated" data-taxtype="{}">{{ STCOut1[17] }}</td>
                                  <td width="75%" v-if="STCMainRV === 42" align="right" class="formulated" data-taxtype="{}">{{ STCOut1[17] + STCOut1[11] }}</td>
                                  <td width="75%" v-if="STCMainRV === 45" align="right" class="formulated" data-taxtype="{}">{{ STCOut1[17] + STCOut1[11] }}</td>
                                  <td width="25%" align="center">
                                      <font v-if="STCMainRV === 30" color="#FF0000">({{ STCOut1[54] }})</font>
                                      <font v-if="STCMainRV === 46" color="#FF0000">({{ STCOut1[49] + STCOut1[54] }})</font>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </td>
                  <!-- cell right -->
                  <td width="18%" align="right" class="formulated" data-taxtype="{}">{{ STCOut1[23] }}</td>
              </tr>

              
              <tr v-if="STCMainRV === 24">
                  <td width='80%'>總 免 稅 額</td>
                  <td width='20%' align='right' class="formulated">{{ STCOut1[25] }}</td>
              </tr>
              <tr v-if="STCMainRV === 24">
                  <td width='80%'>應 課 稅 入 息 實 額</td>
                  <td width='20%' align='right' class="formulated">{{ STCOut1[28] }}</td>
              </tr>
              <tr v-if="STCMainRV === 22 || STCMainRV === 10">
                    <td width='80%'>&nbsp;&nbsp;&nbsp;&nbsp;傷 殘 受 養 人</td>
                    <td width='20%' align='right' class="formulated">{{ STCOut1[11] }}</td>
                </tr>
                <tr v-if="STCMainRV === 22 || STCMainRV === 10">
                    <td width='80%'>總 免 稅 額</td>
                    <td width='20%' align='right' class="formulated">{{ STCOut1[24] }}</td>
                </tr>
                <tr v-if="STCMainRV === 22 || STCMainRV === 10">
                    <td width='80%'>應 課 稅 入 息 實 額</td>
                    <td width='20%' align='right' class="formulated">{{ STCOut1[27] }}</td>
                </tr>
                <tr v-if="STCMainRV !== 24 && STCMainRV !== 22 && STCMainRV !== 10">
                  <td width="46%">總 免 稅 額</td>
                  <td width="18%">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tbody>
                              <tr>
                                  <td width="75%" align="right" class="formulated" data-taxtype="{'-': 0, 'else': 10}">{{ STCOut1[24] }}</td>
                                  <td width="25%" align="center">&nbsp;</td>
                              </tr>
                          </tbody>
                      </table>
                  </td>
                  <td width="18%">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tbody>
                              <tr>
                                  <td width="75%" align="right" class="formulated" data-taxtype="{}">{{ STCOut1[25] }}</td>
                                  <td width="25%" align="center">&nbsp;</td>
                              </tr>
                          </tbody>
                      </table>
                  </td>
                  <td width="18%" align="right" class="formulated" data-taxtype="{}">{{ STCOut1[26] }}</td>
              </tr>
              <tr v-if="STCMainRV !== 24 && STCMainRV !== 22 && STCMainRV !== 10">
                  <td width="46%">應 課 稅 入 息 實 額</td>
                  <td width="18%">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tbody>
                              <tr>
                                  <td width="75%" align="right" class="formulated" data-taxtype="{'-': 0, 'else': 10}">{{ STCOut1[27] }}</td>
                                  <td width="25%" align="center">&nbsp;</td>
                              </tr>
                          </tbody>
                      </table>
                  </td>
                  <td width="18%">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tbody>
                              <tr>
                                  <td width="75%" align="right" class="formulated" data-taxtype="{}">{{ STCOut1[28] }}</td>
                                  <td width="25%" align="center">&nbsp;</td>
                              </tr>
                          </tbody>
                      </table>
                  </td>
                  <td width="18%" align="right" class="formulated" data-taxtype="{}">{{ STCOut1[29] }}</td>
              </tr>
              <tr v-if="STCMainRV !== 24 && STCMainRV !== 22 && STCMainRV !== 10">
                  <td width="46%">應 繳 稅 款</td>
                  <td width="18%">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tbody>
                              <tr>
                                  <!-- 標準稅 -->
                                  <!--
                                  <td width="75%" align="right" class="formulated" data-taxtype="{'-': 0, 'else': 10}">{{ STCOut1[30] }}</td>
                                  -->
                                  <!-- 累進稅 -->
                                  <td width="75%" align="right" class="formulated" data-taxtype="{}">{{ STCOut1[30] }}</td>
                                  <td width="25%" align="center">&nbsp;</td>
                              </tr>
                          </tbody>
                      </table>
                  </td>
                  <td width="18%">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tbody>
                              <tr>
                                  <td width="75%" align="right" class="formulated" data-taxtype="{}">{{ STCOut1[31] }}</td>
                                  <td width="25%" align="center">&nbsp;</td>
                              </tr>
                          </tbody>
                      </table>
                  </td>
                  <td width="18%" align="right" class="formulated" data-taxtype="{}">{{ STCOut1[33] }}</td>
              </tr>
              <tr v-if="STCMainRV !== 24 && STCMainRV !== 22 && STCMainRV !== 10">
                  <td width="46%">你 及 你 配 偶 應 繳 的 總 稅 款</td>
                  <td width="36%" colspan="2" align="center">
                      <font color="#FF0000" class="formulated" data-taxtype="{}">{{ STCOut1[32] }}</font>
                  </td>
                  <td width="18%" align="right" class="formulated" data-taxtype="{'rebate': false}">{{ STCOut1[33] }}</td>
              </tr>
              <tr v-if="STCMainRV === 24">
                  <td width='80%'>你 應 繳 的 總 稅 款</td>
                  <td width='20%' align='right'>
                      <font color='#FF0000' class="formulated">{{ STCOut1[31] }}</font>
                  </td>
              </tr>
              <tr v-if="STCMainRV === 22 || STCMainRV === 10">
                  <td width='80%'>你 應 繳 的 總 稅 款</td>
                  <td width='20%' align='right'>
                      <font color='#FF0000' class="formulated">{{ STCOut1[30] }}</font>
                  </td>
              </tr>
          </tbody>
      </table>


    </div>
  </div>
</template>

<script>
import * as aliasHH from './Hello_data'
export default aliasHH
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}



.a_slide {
  width: 150px;
  min-height: 150px;
  border: 1px solid #F00;
  display: inline-block;
  vertical-align: top;
}

.formulated {
  color: mediumorchid;
}
</style>
