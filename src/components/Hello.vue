<template>
  <div class="hello">
    <div class="wrapper">
      <h2 class="hide">[Input] taxtype: {{ STCMainRV }} - 有傷殘： {{ STCIn8 }}</h2>
      <div class="slider_cont">

        <div class="a_slide">
          <div class="a__option col-xs-6">
            <input type="radio" id="single" value="S" v-model="martial_status" vX-on:change="chg_method">
            <label for="single" class="martial single" :class="{active: martial_status !== 'M'}">{{ lang.martial_single }}</label>
          </div>

          <div class="a__option col-xs-6">
            <input type="radio" id="married" value="M" v-model="martial_status" vX-on:change="chg_method">
            <label for="married" class="martial married" :class="{active: martial_status === 'M'}">{{ lang.martial_married }}</label>
          </div>
        </div>

        <vue-slider width="90%" v-model="progress_1" v-bind:max="progress_1_max" v-bind:tooltip="'none'" v-on:drag-end="slider_slick"></vue-slider>
        <div class="slick_cont" :class="{is_single: martial_status !== 'M'}">
        <slick ref="slick" :options="slickOptions" @afterChange="slick_afterchange">
            <div class="a_slide">
                <p class="item_title">{{ lang.income }}<span class="icon_info" v-tooltip="{ html: 'income_info' }">&nbsp;</span></p>
                <label for="self_income"><span class="label_text">{{ lang.self }}</span>
                <input id="self_income" type="number" min="0" max="999999999" v-model="slfIncome" />
                </label>
                <label v-if="martial_status === 'M'" for="spouse_income"><span class="label_text">{{ lang.spouse }}</span>
                <input id="spouse_income" type="number" min="0" max="999999999" v-model="spsIncome" />
                </label>
            </div>
    
            <div class="a_slide deduct">
                <p class="item_title">{{ lang.oe }}</p>
                <label for="self_oe"><span class="label_text">{{ lang.self }}</span>
                <input id="self_oe" type="number" min="0" max="999999999" v-model="slfOE" />
                </label>
                <label v-if="martial_status === 'M'" for="spouse_oe"><span class="label_text">{{ lang.spouse }}</span>
                <input id="spouse_oe" type="number" min="0" max="999999999" v-model="spsOE" />
                </label>
            </div>
            
            <div class="a_slide deduct">
                <p class="item_title">{{ lang.eduexp }}</p>
                <label for="self_eduexp"><span class="label_text">{{ lang.self }}</span>
                <input id="self_eduexp" type="number" min="0" max="999999999" v-model="slfSEE" />
                </label>
                <label v-if="martial_status === 'M'" for="spouse_eduexp"><span class="label_text">{{ lang.spouse }}</span>
                <input id="spouse_eduexp" type="number" min="0" max="999999999" v-model="spsSEE" />
                </label>
            </div>
            
            <div class="a_slide deduct">
                <p class="item_title">{{ lang.donation }}</p>
                <label for="self_donation"><span class="label_text">{{ lang.self }}</span>
                <input id="self_donation" type="number" min="0" max="999999999" v-model="slfDona" />
                </label>
                <label v-if="martial_status === 'M'" for="spouse_donation"><span class="label_text">{{ lang.spouse }}</span>
                <input id="spouse_donation" type="number" min="0" max="999999999" v-model="spsDona" />
                </label>
            </div>
            
            <div class="a_slide deduct">
                <p class="item_title">{{ lang.mpf }}</p>
                <label for="self_mpf"><span class="label_text">{{ lang.self }}</span>
                <input id="self_mpf" type="number" min="0" max="999999999" v-model="slfMpf" />
                </label>
                <label v-if="martial_status === 'M'" for="spouse_mpf"><span class="label_text">{{ lang.spouse }}</span>
                <input id="spouse_mpf" type="number" min="0" max="999999999" v-model="spsMpf" />
                </label>
            </div>
            
            <div class="a_slide deduct">
                <p class="item_title">{{ lang.homeloan }}</p>
                <label for="self_homeloan"><span class="label_text">{{ lang.self }}</span>
                <input id="self_homeloan" type="number" min="0" max="999999999" v-model="slfLoan" />
                </label>
                <label v-if="martial_status === 'M'" for="spouse_homeloan"><span class="label_text">{{ lang.spouse }}</span>
                <input id="spouse_homeloan" type="number" min="0" max="999999999" v-model="spsLoan" />
                </label>
            </div>              

            <div class="a_slide">
                <p class="item_title">{{ lang.residence }}</p>
                <label for="self_residence"><span class="label_text">{{ lang.self }}</span>
                <input id="self_residence" type="number" min="0" max="999999999" v-model="slfResi" />
                </label>
                <label v-if="martial_status === 'M'" for="spouse_residence"><span class="label_text">{{ lang.spouse }}</span>
                <input id="spouse_residence" type="number" min="0" max="999999999" v-model="spsResi" />
                </label>
            </div>
            
        </slick>
        </div>

        
        <div class="additional">
            <div class="a_slide" v-bind:class="{ active: sh_elderly }">
                <p class="sect_title" v-on:click="toggleClass('sh_elderly')">長者照顧</p>

                <div class="cont">
                    <p class="item_title">{{ lang.self + '負責' }}</p>
                    <label for="self_elderly"><span class="label_text">{{ lang.elderly }}</span>
                    <!-- <input id="self_elderly" type="text" v-model="slfElder" /> -->
                    <vue-slider width="90%" v-model="slfElder" v-bind:min="s_Elder_min" v-bind:max="s_Elder_max" v-bind:tooltip="s_tooltip" v-on:drag-end=""></vue-slider>
                    </label>

                    <label v-if="slfElder > 0" for="self_disabledep"><span class="label_text">{{ lang.disabledep }}</span>
                    <!-- <input id="self_disabledep" type="text" v-model="slfDisdep" /> -->
                    <vue-slider width="90%" v-model="slfDisdep" v-bind:min="s_Elder_min" v-bind:max="slfElder" v-bind:tooltip="s_tooltip" v-on:drag-end=""></vue-slider>
                    </label>

                    <label v-if="slfElder > 0" for="self_eldresi_amt"><span class="label_text">{{ lang.eldresi_amt }}</span>
                    <input id="self_eldresi_amt" type="number" min="0" max="999999999" v-model="slfERCE" />
                    </label>
                </div>

                
                <div class="cont" v-if="martial_status === 'M'">
                    <p class="item_title">{{ lang.spouse + '負責' }}</p>
                    <label for="spouse_elderly"><span class="label_text">{{ lang.elderly }}</span>
                    <!-- <input id="spouse_elderly" type="text" v-model="spsElder" /> -->
                    <vue-slider width="90%" v-model="spsElder" v-bind:min="s_Elder_min" v-bind:max="s_Elder_max" v-bind:tooltip="s_tooltip" v-on:drag-end=""></vue-slider>
                    </label>

                    <label v-if="martial_status === 'M' && spsElder > 0" for="spouse_disabledep"><span class="label_text">{{ lang.disabledep }}</span>
                    <!-- <input id="spouse_disabledep" type="text" v-model="spsDisdep" /> -->
                    <vue-slider width="90%" v-model="spsDisdep" v-bind:min="s_Elder_min" v-bind:max="spsElder" v-bind:tooltip="s_tooltip" v-on:drag-end=""></vue-slider>
                    </label>

                    <label v-if="martial_status === 'M' && spsElder > 0" for="spouse_eldresi_amt"><span class="label_text">{{ lang.eldresi_amt }}</span>
                    <input id="spouse_eldresi_amt" type="number" min="0" max="999999999" v-model="spsERCE" />
                    </label>
                </div>
            </div>

            <div class="a_slide" v-bind:class="{ active: sh_bb }">
                <p class="sect_title" v-on:click="toggleClass('sh_bb')">受養人</p>
                <div class="cont">

                    <label for="NBbb">在課稅年度內出生子女（名）<!-- <input id="NBbb" type="text" v-model="NBbb" v-on:change="D3aOnChange()" /> <!- -  STCIn21 -->
                    <vue-slider width="90%" v-model="NBbb" v-bind:min="s_bb_min" v-bind:max="s_bb_max" v-bind:tooltip="s_tooltip" v-on:drag-end="D3aOnChange()"></vue-slider>
                    </label>
                    <label for="CAbb">在其他課稅年度出生的子女（名）<!-- <input id="CAbb" type="text" v-model="CAbb" v-on:input="D3OnChange()" /> <!- -   STCIn4 -->
                    <vue-slider width="90%" v-model="CAbb" v-bind:min="s_bb_min" v-bind:max="9 - NBbb" v-bind:tooltip="s_tooltip" v-on:drag-end="D3OnChange()"></vue-slider>
                    </label>
                    <br>                    
                    <label for="brosis_dep">供養兄弟/姊妹</label><!-- <input id="brosis_dep" type="text" v-model="brosis_dep" v-on:change="D5OnChange()" /> <!- -   STCIn5 -->
                    <vue-slider width="90%" v-model="brosis_dep" v-bind:min="s_bb_min" v-bind:max="s_bb_max" v-bind:tooltip="s_tooltip" v-on:drag-end="D5OnChange()"></vue-slider>
                    <br>
                    <p>供養全年與你同住的年滿60歲或以上的父母/祖父母或外祖父母</p>
                    <label for="resi_parent">全年與你同住</label><!-- <input id="resi_parent" type="text" v-model="resi_parent" v-on:change="D7OnChange()" /> <!- -   STCIn6 -->
                    <vue-slider width="90%" v-model="resi_parent" v-bind:min="s_Elder_min" v-bind:max="s_Elder_max" v-bind:tooltip="s_tooltip" v-on:drag-end="D7OnChange()"></vue-slider>
                    <label for="non_resi_parent">並非全年與你同住</label><!-- <input id="non_resi_parent" type="text" v-model="non_resi_parent" v-on:change="D9OnChange()" /> <!- -   STCIn7 -->
                    <vue-slider width="90%" v-model="non_resi_parent" v-bind:min="s_Elder_min" v-bind:max="s_Elder_max" v-bind:tooltip="s_tooltip" v-on:drag-end="D9OnChange()"></vue-slider>
                    <br>
                    <p>供養全年與你同住的年滿55歲但未滿60歲的父母/祖父母或外祖父母</p>
                    <label for="resi_parent_5560">全年與你同住</label><!-- <input id="resi_parent_5560" type="text" v-model="resi_parent_5560" /> <!- -  STCIn17 -->
                    <vue-slider width="90%" v-model="resi_parent_5560" v-bind:min="s_Elder_min" v-bind:max="s_Elder_max" v-bind:tooltip="s_tooltip" v-on:drag-end=""></vue-slider>
                    <label for="non_resi_parent_5560">並非全年與你同住</label><!-- <input id="non_resi_parent_5560" type="text" v-model="non_resi_parent_5560" /> <!- -  STCIn18 -->
                    <vue-slider width="90%" v-model="non_resi_parent_5560" v-bind:min="s_Elder_min" v-bind:max="s_Elder_max" v-bind:tooltip="s_tooltip" v-on:drag-end=""></vue-slider>
                </div>
            </div>

            <div class="a_slide" v-bind:class="{ active: sh_bb_dis }">
                <p class="sect_title" v-on:click="toggleClass('sh_bb_dis')">傷殘的受養人</p>
                <div class="cont">

                    <label v-if="NBbb > 0" for="NBbb_DIS"><span class="label_text">在課稅年度內出生子女（名）</span><!--<input id="NBbb_DIS" type="text" v-model="NBbb_DIS" v-on:change="D4aOnChange()" /> <!- -  STCIn10 -->
                    <vue-slider width="90%" v-model="NBbb_DIS" v-bind:min="s_bb_min" v-bind:max="NBbb" v-bind:tooltip="s_tooltip" v-on:drag-end="D4aOnChange()"></vue-slider>
                    </label>
                    <label v-if="CAbb > 0" for="CAbb_DIS"><span class="label_text">在其他課稅年度出生的子女（名）</span><!--<input id="CAbb_DIS" type="text" v-model="CAbb_DIS" v-on:change="D4OnChange()" /> <!- -  STCIn22 -->
                    <vue-slider width="90%" v-model="CAbb_DIS" v-bind:min="s_bb_min" v-bind:max="CAbb" v-bind:tooltip="s_tooltip" v-on:drag-end="D4OnChange()"></vue-slider>
                    </label>
                    <label for="brosis_dep_DIS">供養兄弟/姊妹</label><!--<input id="brosis_dep_DIS" type="text" v-model="brosis_dep_DIS" v-on:change="D6OnChange()" /> <!- -  STCIn11 -->
                    <vue-slider width="90%" v-model="brosis_dep_DIS" v-bind:min="s_bb_min" v-bind:max="brosis_dep" v-bind:tooltip="s_tooltip" v-on:drag-end="D6OnChange()"></vue-slider>
                    <br>
                    <p>供養全年與你同住的年滿60歲或以上的父母/祖父母或外祖父母</p>
                    <label for="resi_parent_DIS">全年與你同住</label><!--<input id="resi_parent_DIS" type="text" v-model="resi_parent_DIS" v-on:change="D8OnChange()" /> <!- -  STCIn12 -->
                    <vue-slider width="90%" v-model="resi_parent_DIS" v-bind:min="s_Elder_min" v-bind:max="resi_parent" v-bind:tooltip="s_tooltip" v-on:drag-end="D8OnChange()"></vue-slider>
                    <label for="non_resi_parent_DIS">並非全年與你同住</label><!--<input id="non_resi_parent_DIS" type="text" v-model="non_resi_parent_DIS" v-on:change="D10OnChange()" /> <!- -  STCIn13 -->
                    <vue-slider width="90%" v-model="non_resi_parent_DIS" v-bind:min="s_Elder_min" v-bind:max="non_resi_parent" v-bind:tooltip="s_tooltip" v-on:drag-end="D10OnChange()"></vue-slider>
                    <br>
                    <label v-if="martial_status === 'M'" for="spouse_disabled_dependent_DIS">
                        傷殘配偶受養人
                        <span v-if="spouse_disabled_dependent_DIS">（合資格）</span>
                        <span v-if="!spouse_disabled_dependent_DIS">（並非合資格）</span>
                    </label>
                    <switches v-if="martial_status === 'M'" v-model="spouse_disabled_dependent_DIS" theme="bootstrap" color="primary"></switches>
                    <!-- <input id="spouse_disabled_dependent_DIS" type="number" v-model="spouse_disabled_dependent_DIS" /> <!- -  STCIn9 -->
                </div>
            </div>

            <div v-if="martial_status === 'S' && NBbb + CAbb > 0" class="a_slide" v-bind:class="{ active: sh_single_parent }">
                <p class="sect_title" v-on:click="toggleClass('sh_single_parent')">單親免稅額</p>
                <div class="cont">
                    <label for="single_parent">
                        <span>單親免稅額</span>
                        <span v-if="single_parent">（合資格）</span>
                        <span v-if="!single_parent">（並非合資格）</span>
                    </label>
                    <switches v-model="single_parent" theme="bootstrap" color="primary"></switches>
                    <!-- <input id="single_parent" type="number" v-model="single_parent" /> <!- -  STCIn23 -->
                </div>
            </div>

        </div>

      <h2 style="display: none;">Output</h2>
      <tax2018 v-bind:msg='msg' v-bind:STCIn8='STCIn8' v-bind:martial_status='martial_status' v-bind:slfIncome='slfIncome' v-bind:spsIncome='spsIncome' v-bind:slfResi='slfResi' v-bind:spsResi='spsResi' v-bind:slfOE='slfOE' v-bind:spsOE='spsOE' v-bind:slfSEE='slfSEE' v-bind:spsSEE='spsSEE' v-bind:slfDona='slfDona' v-bind:spsDona='spsDona' v-bind:slfMpf='slfMpf' v-bind:spsMpf='spsMpf' v-bind:slfLoan='slfLoan' v-bind:spsLoan='spsLoan' v-bind:s_Elder_min='s_Elder_min' v-bind:s_Elder_max='s_Elder_max' v-bind:s_tooltip='s_tooltip' v-bind:slfElder='slfElder' v-bind:slfDisdep='slfDisdep' v-bind:slfERCE='slfERCE' v-bind:spsElder='spsElder' v-bind:spsDisdep='spsDisdep' v-bind:spsERCE='spsERCE' v-bind:s_bb_min='s_bb_min' v-bind:s_bb_max='s_bb_max' v-bind:NBbb='NBbb' v-bind:CAbb='CAbb' v-bind:single_parent='single_parent' v-bind:brosis_dep='brosis_dep' v-bind:resi_parent='resi_parent' v-bind:non_resi_parent='non_resi_parent' v-bind:resi_parent_5560='resi_parent_5560' v-bind:non_resi_parent_5560='non_resi_parent_5560' v-bind:NBbb_DIS='NBbb_DIS' v-bind:CAbb_DIS='CAbb_DIS' v-bind:brosis_dep_DIS='brosis_dep_DIS' v-bind:resi_parent_DIS='resi_parent_DIS' v-bind:non_resi_parent_DIS='non_resi_parent_DIS' v-bind:spouse_disabled_dependent_DIS='spouse_disabled_dependent_DIS' v-bind:STCMainRV='STCMainRV' v-bind:STCOut1='STCOut1' v-bind:end='end' ></tax2018>
      
      <table border="1" width="100%" style="display: none;">
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

    <div class="tool_tips" id="income_info">
        <p>入息是指課稅年度內的收入。<a href="https://www.gov.hk/tc/residents/taxes/salaries/salariestax/chargeable/index.htm" target="_blank">（詳情）</a></p>
    </div>
  </div>
</template>

<script>
import * as aliasHH from './Hello_data'
export default aliasHH
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
