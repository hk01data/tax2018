<template>
  <div class="hello" id="content">
    <div class="wrapper">
      <h2 class="hide">[Input] taxtype: {{ STCMainRV }} - 有傷殘： {{ STCIn8 }}</h2>
      <div class="slider_cont">

        <div class="a_slide" :class="{is_married: martial_status === 'M'}">
          <div class="a__option col-xs-6">
            <input type="radio" id="single" value="S" v-model="martial_status" vX-on:change="chg_method">
            <label for="single" class="martial single" :class="{active: martial_status !== 'M'}">{{ lang.martial_single }}</label>
          </div>

          <div class="a__option col-xs-6">
            <input type="radio" id="married" value="M" v-model="martial_status" vX-on:change="chg_method">
            <label for="married" class="martial married" :class="{active: martial_status === 'M'}">{{ lang.martial_married }}</label>
          </div>
        </div>

        <div class="slick_cont" :class="{is_married: martial_status === 'M'}">
        <slick ref="slick" :options="slickOptions" @afterChange="slick_afterchange">
            <div class="a_slide">
                <p class="item_title">{{ lang.income }}<a href="javascript:void(0);" class="icon_info" v-tooltip.bottom.end="{ html: 'income_info' }">&nbsp;</a></p>
                <label for="self_income"><span class="label_text">{{ lang.self }}</span>
                <input id="self_income" type="number" @focus="$event.target.select()" min="0" max="999999999" v-model="slfIncome" tabindex="100" />
                </label>
                <label v-if="martial_status === 'M'" for="spouse_income"><span class="label_text">{{ lang.spouse }}</span>
                <input id="spouse_income" type="number" @focus="$event.target.select()" min="0" max="999999999" v-model="spsIncome" />
                </label>
            </div>
            
            <div class="a_slide deduct">
                <p class="item_title">{{ lang.mpf }}<a href="javascript:void(0);" class="icon_info" v-tooltip.bottom.end="{ html: 'mpf_info' }">&nbsp;</a></p>
                <label for="self_mpf"><span class="label_text">{{ lang.self }}</span>
                <input id="self_mpf" type="number" @focus="$event.target.select()" min="0" max="999999999" v-model="slfMpf" />
                </label>
                <label v-if="martial_status === 'M'" for="spouse_mpf"><span class="label_text">{{ lang.spouse }}</span>
                <input id="spouse_mpf" type="number" @focus="$event.target.select()" min="0" max="999999999" v-model="spsMpf" />
                </label>
            </div>
<!-- MOCK 6.1 上限 fixed $18,000, like MPF ( 必须有入息 )-->
            <!-- <div class="a_slide deduct">
                <p class="item_title">{{ lang.byBook }}<a href="javascript:void(0);" class="icon_info" v-tooltip.bottom.end="{ html: 'book_info' }">&nbsp;</a></p>
                <label for="self_book"><span class="label_text">{{ lang.self }}</span>
                <input id="self_book" type="number" min="0" max="999999999" v-model="slfBook" />
                </label>
                <label v-if="martial_status === 'M'" for="spouse_book"><span class="label_text">{{ lang.spouse }}</span>
                <input id="spouse_book" type="number" min="0" max="999999999" v-model="spsBook" />
                </label>
            </div> -->
            <div class="a_slide deduct">
                <p class="item_title">{{ lang.eduexp }}<a href="javascript:void(0);" class="icon_info" v-tooltip.bottom.end="{ html: 'eduexp_info' }">&nbsp;</a></p>
                <label for="self_eduexp"><span class="label_text">{{ lang.self }}</span>
                <input id="self_eduexp" type="number" @focus="$event.target.select()" min="0" max="999999999" v-model="slfSEE" />
                </label>
                <label v-if="martial_status === 'M'" for="spouse_eduexp"><span class="label_text">{{ lang.spouse }}</span>
                <input id="spouse_eduexp" type="number" @focus="$event.target.select()" min="0" max="999999999" v-model="spsSEE" />
                </label>
            </div>

            <div class="a_slide deduct">
                <p class="item_title">{{ lang.donation }}<a href="javascript:void(0);" class="icon_info" v-tooltip.bottom.end="{ html: 'donation_info' }">&nbsp;</a></p>
                <label for="self_donation"><span class="label_text">{{ lang.self }}</span>
                <input id="self_donation" type="number" @focus="$event.target.select()" min="0" max="999999999" v-model="slfDona" />
                </label>
                <label v-if="martial_status === 'M'" for="spouse_donation"><span class="label_text">{{ lang.spouse }}</span>
                <input id="spouse_donation" type="number" @focus="$event.target.select()" min="0" max="999999999" v-model="spsDona" />
                </label>
            </div>

            <div class="a_slide deduct">
                <p class="item_title">{{ lang.homeloan }}<a href="javascript:void(0);" class="icon_info" v-tooltip.bottom.end="{ html: 'homeloan_info' }">&nbsp;</a></p>
                <label for="self_homeloan"><span class="label_text">{{ lang.self }}</span>
                <input id="self_homeloan" type="number" @focus="$event.target.select()" min="0" max="999999999" v-model="slfLoan" />
                </label>
                <label v-if="martial_status === 'M'" for="spouse_homeloan"><span class="label_text">{{ lang.spouse }}</span>
                <input id="spouse_homeloan" type="number" @focus="$event.target.select()" min="0" max="999999999" v-model="spsLoan" />
                </label>
            </div>

            <div class="a_slide">
                <p class="item_title">{{ lang.residence }}<a href="javascript:void(0);" class="icon_info" v-tooltip.bottom.end="{ html: 'residence_info' }">&nbsp;</a></p>
                <label for="self_residence"><span class="label_text">{{ lang.self }}</span>
                <input id="self_residence" type="number" @focus="$event.target.select()" min="0" max="999999999" v-model="slfResi" />
                </label>
                <label v-if="martial_status === 'M'" for="spouse_residence"><span class="label_text">{{ lang.spouse }}</span>
                <input id="spouse_residence" type="number" @focus="$event.target.select()" min="0" max="999999999" v-model="spsResi" />
                </label>
            </div>

            <div class="a_slide deduct">
                <p class="item_title">{{ lang.oe }}<a href="javascript:void(0);" class="icon_info" v-tooltip.bottom.end="{ html: 'oe_info' }">&nbsp;</a></p>
                <label for="self_oe"><span class="label_text">{{ lang.self }}</span>
                <input id="self_oe" type="number" @focus="$event.target.select()" min="0" max="999999999" v-model="slfOE" />
                </label>
                <label v-if="martial_status === 'M'" for="spouse_oe"><span class="label_text">{{ lang.spouse }}</span>
                <input id="spouse_oe" type="number" @focus="$event.target.select()" min="0" max="999999999" v-model="spsOE" />
                </label>
            </div>
            
        </slick>
        </div>

        <h2 style="display: none;">Output</h2>
        <!--  onday_onday(10) -->
        <taxNewYear v-bind:STCIn8='STCIn8' v-bind:martial_status='martial_status' v-bind:slfIncome='slfIncome' v-bind:spsIncome='spsIncome' v-bind:slfResi='slfResi' v-bind:spsResi='spsResi' v-bind:slfOE='slfOE' v-bind:spsOE='spsOE' v-bind:slfSEE='slfSEE' v-bind:spsSEE='spsSEE' v-bind:slfDona='slfDona' v-bind:spsDona='spsDona' v-bind:spsMpf='spsMpf' v-bind:slfMpf='slfMpf' v-bind:slfLoan='slfLoan' v-bind:spsLoan='spsLoan' v-bind:s_Elder_min='s_Elder_min' v-bind:s_Elder_max='s_Elder_max' v-bind:s_tooltip='s_tooltip' v-bind:slfElder='slfElder' v-bind:slfDisdep='slfDisdep' v-bind:slfERCE='slfERCE' v-bind:spsElder='spsElder' v-bind:spsDisdep='spsDisdep' v-bind:spsERCE='spsERCE' v-bind:s_bb_min='s_bb_min' v-bind:s_bb_max='s_bb_max' v-bind:NBbb='NBbb' v-bind:CAbb='CAbb' v-bind:single_parent='single_parent' v-bind:brosis_dep='brosis_dep' v-bind:resi_parent='resi_parent' v-bind:non_resi_parent='non_resi_parent' v-bind:resi_parent_5560='resi_parent_5560' v-bind:non_resi_parent_5560='non_resi_parent_5560' v-bind:NBbb_DIS='NBbb_DIS' v-bind:CAbb_DIS='CAbb_DIS' v-bind:brosis_dep_DIS='brosis_dep_DIS' v-bind:resi_parent_DIS='resi_parent_DIS' v-bind:non_resi_parent_DIS='non_resi_parent_DIS' v-bind:spouse_disabled_dependent_DIS='spouse_disabled_dependent_DIS' v-bind:STCMainRV='STCMainRV' v-bind:STCOut1='STCOut1'
        v-bind:slfMedInsu='slfMedInsu'
        v-bind:spsMedInsu='spsMedInsu'
        v-bind:slfMedInsu_ppl='slfMedInsu_ppl'
        v-bind:spsMedInsu_ppl='spsMedInsu_ppl'
        v-bind:self_disabled_DIS='self_disabled_DIS'
        v-bind:sps_disabled_DIS='sps_disabled_DIS'
        v-bind:slfVolunMpf='slfVolunMpf'
        v-bind:spsVolunMpf='spsVolunMpf'
        v-bind:end='end' ></taxNewYear>

        <div class="additional new_add">
            <h2 class="section_heading">
                ⬇⬇⬇ 更多項目 ⬇⬇⬇
                <!-- <img class="new_gif" src="static/img/new.gif" alt="new items"> -->
            </h2>
            <!-- MOCK INAG visa -->
            <!-- <div class="a_slide" v-bind:class="{ active: sh_elderly }">
                <p class="sect_title">IANG visa 持有人免稅額<img class="new_gif" src="static/img/new.gif" alt="new items"></p>
                <div class="cont">

                    <label for="self_iang_visa">
                        <span>你是否合持有 IANG visa？<a href="javascript:void(0);" class="icon_info" v-tooltip.bottom.end="{ html: 'self_iang_visa_info' }">&nbsp;</a></span>
                        <div class="switch_cont">
                            <span class="yn">否</span>
                            <switches v-model="self_iang_visa" theme="bootstrap" color="primary"></switches>
                            <span class="yn">是</span>
                        </div>
                    </label>

                    <label v-if="martial_status === 'M'" for="sps_iang_visa">
                        <span>你配偶是否合持有 IANG visa？<a href="javascript:void(0);" class="icon_info" v-tooltip.bottom.end="{ html: 'sps_iang_visa_info' }">&nbsp;</a></span>
                        <div class="switch_cont">
                            <span class="yn">否</span>
                            <switches v-model="sps_iang_visa" theme="bootstrap" color="primary"></switches>
                            <span class="yn">是</span>
                        </div>
                    </label>
                </div>
            </div> -->
            <!-- MOCK adding number type item and the amount have limitation -->
            <!-- <div v-if="true" class="a_slide" v-bind:class="{ active: sh_elderly }">
                <p class="sect_title">【新型肺炎】防疫開支<img class="new_gif" src="static/img/new.gif" alt="new items"></p>
                <div class="cont">
                    <p class="item_title" v-if="martial_status === 'M'">{{ lang.self + '負責' }}</p>

                    <label for="slfDiseaseExp">
                        <span class="label_text">金額</span>
                        <span v-if="martial_status === 'S'"><a href="javascript:void(0);" class="icon_info" v-tooltip.bottom.end="{ html: 'single_disease_expense_info' }">&nbsp;</a></span>
                        <a v-else href="javascript:void(0);" class="icon_info" v-tooltip.bottom.end="{ html: 'slf_disease_expense_info' }">&nbsp;</a>
                        <input id="slfDiseaseExp" type="number" min="0" max="999999999" v-model="slfDiseaseExp" />
                    </label>
                
                    <div class="cont_sps" v-if="martial_status === 'M'">
                        <p class="item_title" v-if="martial_status === 'M'">{{ lang.spouse + '負責' }}</p>
                        <label for="spsDiseaseExp"><span class="label_text">金額</span><a href="javascript:void(0);" class="icon_info" v-tooltip.bottom.end="{ html: 'sps_disease_expense_info' }">&nbsp;</a>
                        <input id="spsDiseaseExp" type="number" min="0" max="999999999" v-model="spsDiseaseExp" />
                        </label>
                    </div>
                </div>
            </div> -->
            <div class="a_slide" v-bind:class="{ active: sh_elderly }">
                <p class="sect_title">傷殘人士免稅額</p>
                <div class="cont">

                    <label for="self_disabled_DIS">
                        <span>你是否合資格傷殘人士？<a href="javascript:void(0);" class="icon_info" v-tooltip.bottom.end="{ html: 'self_DIS_info' }">&nbsp;</a></span>
                        <div class="switch_cont">
                            <span class="yn">否</span>
                            <switches v-model="self_disabled_DIS" theme="bootstrap" color="primary"></switches>
                            <span class="yn">是</span>
                            <!-- <input id="self_disabled_DIS" type="number" v-model="self_disabled_DIS" /> <!- -  STCIn9 -->
                        </div>
                    </label>

                    <label v-if="martial_status === 'M'" for="sps_disabled_DIS">
                        <span>你配偶是否合資格傷殘人士？<a href="javascript:void(0);" class="icon_info" v-tooltip.bottom.end="{ html: 'sps_DIS_info' }">&nbsp;</a></span>
                        <div class="switch_cont">
                            <span class="yn">否</span>
                            <switches v-model="sps_disabled_DIS" theme="bootstrap" color="primary"></switches>
                            <span class="yn">是</span>
                            <!-- <input id="sps_disabled_DIS" type="number" v-model="sps_disabled_DIS" /> <!- -  STCIn9 -->
                        </div>
                    </label>
                </div>
            </div>
            <div v-if="true" class="a_slide" v-bind:class="{ active: sh_elderly }">
                <p class="sect_title">年金保費及強積金自願性供款</p>
                <div class="cont">
                    <p class="item_title" v-if="martial_status === 'M'">{{ lang.self + '負責' }}</p>

                    <label for="slfVolunMpf"><span class="label_text">金額</span><a href="javascript:void(0);" class="icon_info" v-tooltip.bottom.end="{ html: 'volunMpf_info' }">&nbsp;</a>
                    <input id="slfVolunMpf" type="number" @focus="$event.target.select()" min="0" max="999999999" v-model="slfVolunMpf" />
                    </label>
                
                    <div class="cont_sps" v-if="martial_status === 'M'">
                        <p class="item_title" v-if="martial_status === 'M'">{{ lang.spouse + '負責' }}</p>

                        <label for="spsVolunMpf"><span class="label_text">金額</span><a href="javascript:void(0);" class="icon_info" v-tooltip.bottom.end="{ html: 'volunMpf_info2' }">&nbsp;</a>
                        <input id="spsVolunMpf" type="number" @focus="$event.target.select()" min="0" max="999999999" v-model="spsVolunMpf" />
                        </label>
                    </div>

                </div>
            </div>


            <div v-if="true" class="a_slide" v-bind:class="{ active: sh_elderly }">
                <p class="sect_title">合資格自願醫保計劃保單保費</p>
                <div class="cont">
                    <p class="item_title" v-if="martial_status === 'M'">{{ lang.self + '負責' }}</p>
                    <label for="slfMedInsu_ppl"><span class="label_text lbl_large">你為多少人交醫療保險費？（包括自己）</span><a href="javascript:void(0);" class="icon_info" v-tooltip.bottom.end="{ html: 'medic_insu_info' }">&nbsp;</a>
                    <quantity v-bind:min="s_MedicInsu_min" v-bind:max="s_MedicInsu_max" v-model="slfMedInsu_ppl" v-on:drag-end=""></quantity>
                    </label>

                    <label v-if="slfMedInsu_ppl > 0" for="slfMedInsu"><span class="label_text">每年醫療保險總開支</span>
                    <input id="slfMedInsu" type="number" @focus="$event.target.select()" min="0" max="999999999" v-model="slfMedInsu" />
                    </label>
                
                    <div class="cont_sps" v-if="martial_status === 'M'">
                        <p class="item_title" v-if="martial_status === 'M'">{{ lang.spouse + '負責' }}</p>
                        <label for="spsMedInsu_ppl"><span class="label_text lbl_large">你為多少人交醫療保險費？（包括自己）</span><a href="javascript:void(0);" class="icon_info" v-tooltip.bottom.end="{ html: 'medic_insu_info' }">&nbsp;</a>
                        <quantity v-bind:min="s_MedicInsu_min" v-bind:max="s_MedicInsu_max" v-model="spsMedInsu_ppl"></quantity>
                        </label>

                        <!-- <label v-if="spsMedInsu_ppl > 0" for="spsMedInsu"><span class="label_text">每年醫療保險總開支</span><a href="javascript:void(0);" class="icon_info" v-tooltip.bottom.end="{ html: 'medic_insu_amt_info' }">&nbsp;</a> -->
                        <label v-if="spsMedInsu_ppl > 0" for="spsMedInsu"><span class="label_text">每年醫療保險總開支</span>
                        <input id="spsMedInsu" type="number" @focus="$event.target.select()" min="0" max="999999999" v-model="spsMedInsu" />
                        </label>
                    </div>

                </div>
            </div>

            <div v-if="false" class="a_slide" v-bind:class="{ active: sh_elderly }">
                <p class="sect_title">合資格自願醫保計劃保單保費<a href="javascript:void(0);" class="icon_info" v-tooltip.bottom.end="{ html: 'medic_insu_info' }">&nbsp;</a></p>
                <div class="cont">

                    <label for="self_medic_insu"><span class="label_text lbl_large">{{ lang.self }}</span>
                    <input id="self_medic_insu" type="number" min="0" max="8000" v-model="slfMedInsu" />
                    </label>
                    <label v-if="martial_status === 'M'" for="spouse_medic_insu"><span class="label_text lbl_large">{{ lang.spouse }}</span>
                    <input id="spouse_medic_insu" type="number" min="0" max="8000" v-model="spsMedInsu" />
                    </label>
                </div>
            </div>
        </div>

            <!-- <div v-if="true" class="a_slide" v-bind:class="{ active: sh_elderly }">
                <p class="sect_title">年金保費及強積金自願性供款<sup>#</sup><img class="new_gif" src="static/img/new.gif" alt="new items"></p>
                <div class="cont">
                    <p class="item_title" v-if="martial_status === 'M'">{{ lang.self + '負責' }}</p>

                    <label for="slfVolunMpf"><span class="label_text">金額</span><a href="javascript:void(0);" class="icon_info" v-tooltip.bottom.end="{ html: 'volunMpf_info' }">&nbsp;</a>
                    <input id="slfVolunMpf" type="number" min="0" max="999999999" v-model="slfVolunMpf" />
                    </label>
                
                    <div class="cont_sps" v-if="martial_status === 'M'">
                        <p class="item_title" v-if="martial_status === 'M'">{{ lang.spouse + '負責' }}</p>

                        <label for="spsVolunMpf"><span class="label_text">金額</span><a href="javascript:void(0);" class="icon_info" v-tooltip.bottom.end="{ html: 'volunMpf_info2' }">&nbsp;</a>
                        <input id="spsVolunMpf" type="number" min="0" max="999999999" v-model="spsVolunMpf" />
                        </label>
                    </div>

                </div>
            </div>


            <div v-if="true" class="a_slide" v-bind:class="{ active: sh_elderly }">
                <p class="sect_title">合資格自願醫保計劃保單保費<img class="new_gif" src="static/img/new.gif" alt="new items"></p>
                <div class="cont">
                    <p class="item_title" v-if="martial_status === 'M'">{{ lang.self + '負責' }}</p>
                    <label for="slfMedInsu_ppl"><span class="label_text lbl_large">你為多少人交醫療保險費？（包括自己）</span><a href="javascript:void(0);" class="icon_info" v-tooltip.bottom.end="{ html: 'medic_insu_info' }">&nbsp;</a>
                    <quantity v-bind:min="s_MedicInsu_min" v-bind:max="s_MedicInsu_max" v-model="slfMedInsu_ppl" v-on:drag-end=""></quantity>
                    </label>

                    <label v-if="slfMedInsu_ppl > 0" for="slfMedInsu"><span class="label_text">每年醫療保險總開支</span>
                    <input id="slfMedInsu" type="number" min="0" max="999999999" v-model="slfMedInsu" />
                    </label>
                
                    <div class="cont_sps" v-if="martial_status === 'M'">
                        <p class="item_title" v-if="martial_status === 'M'">{{ lang.spouse + '負責' }}</p>
                        <label for="spsMedInsu_ppl"><span class="label_text lbl_large">你為多少人交醫療保險費？（包括自己）</span><a href="javascript:void(0);" class="icon_info" v-tooltip.bottom.end="{ html: 'medic_insu_info' }">&nbsp;</a>
                        <quantity v-bind:min="s_MedicInsu_min" v-bind:max="s_MedicInsu_max" v-model="spsMedInsu_ppl"></quantity>
                        </label>

                        <label v-if="spsMedInsu_ppl > 0" for="spsMedInsu"><span class="label_text">每年醫療保險總開支</span><a href="javascript:void(0);" class="icon_info" v-tooltip.bottom.end="{ html: 'medic_insu_amt_info' }">&nbsp;</a>
                        <input id="spsMedInsu" type="number" min="0" max="999999999" v-model="spsMedInsu" />
                        </label>
                    </div>

                </div>
            </div>

            <div v-if="false" class="a_slide" v-bind:class="{ active: sh_elderly }">
                <p class="sect_title">合資格自願醫保計劃保單保費<a href="javascript:void(0);" class="icon_info" v-tooltip.bottom.end="{ html: 'medic_insu_info' }">&nbsp;</a></p>
                <div class="cont">

                    <label for="self_medic_insu"><span class="label_text lbl_large">{{ lang.self }}</span>
                    <input id="self_medic_insu" type="number" min="0" max="8000" v-model="slfMedInsu" />
                    </label>
                    <label v-if="martial_status === 'M'" for="spouse_medic_insu"><span class="label_text lbl_large">{{ lang.spouse }}</span>
                    <input id="spouse_medic_insu" type="number" min="0" max="8000" v-model="spsMedInsu" />
                    </label>
                </div>
            </div>
        </div> -->


        <div class="additional">
            <h2 class="section_heading">家庭部分</h2>


            <div class="a_slide" v-bind:class="{ active: sh_elderly }">
                <p class="sect_title">長者院舍開支</p>
                <div class="cont">
                    <p class="item_title" v-if="martial_status === 'M'">{{ lang.self + '負責' }}</p>
                    <label for="self_elderly"><span class="label_text lbl_large">{{ lang.elderly }}</span><a href="javascript:void(0);" class="icon_info" v-tooltip.bottom.end="{ html: 'elderly_info' }">&nbsp;</a>
                    <quantity v-bind:min="s_Elder_min" v-bind:max="s_Elder_max" v-model="slfElder" v-on:drag-end=""></quantity>
                    </label>

                    <label v-if="slfElder > 0" for="self_disabledep"><span class="label_text">{{ lang.disabledep }}</span>
                    <quantity v-bind:min="s_Elder_min" v-bind:max="slfElder" v-model="slfDisdep" v-on:drag-end=""></quantity>
                    </label>

                    <label v-if="slfElder > 0" for="self_eldresi_amt"><span class="label_text lbl_large">{{ lang.eldresi_amt }}</span><a href="javascript:void(0);" class="icon_info" v-tooltip.bottom.end="{ html: 'eldresi_amt_info' }">&nbsp;</a>
                    <input id="self_eldresi_amt" type="number" @focus="$event.target.select()" min="0" max="999999999" v-model="slfERCE" />
                    </label>
                
                    <div class="cont_sps" v-if="martial_status === 'M'">
                        <p class="item_title" v-if="martial_status === 'M'">{{ lang.spouse + '負責' }}</p>
                        <label for="spouse_elderly"><span class="label_text lbl_large">{{ lang.elderly }}</span><a href="javascript:void(0);" class="icon_info" v-tooltip.bottom.end="{ html: 'elderly_info_2' }">&nbsp;</a>
                        <quantity v-bind:min="s_Elder_min" v-bind:max="s_Elder_max" v-model="spsElder"></quantity>
                        </label>

                        <label v-if="martial_status === 'M' && spsElder > 0" for="spouse_disabledep"><span class="label_text">{{ lang.disabledep }}</span>
                        <quantity v-bind:min="s_Elder_min" v-bind:max="spsElder" v-model="spsDisdep"></quantity>
                        </label>

                        <label v-if="martial_status === 'M' && spsElder > 0" for="spouse_eldresi_amt"><span class="label_text">{{ lang.eldresi_amt }}</span><a href="javascript:void(0);" class="icon_info" v-tooltip.bottom.end="{ html: 'eldresi_amt_info_2' }">&nbsp;</a>
                        <input id="spouse_eldresi_amt" type="number" @focus="$event.target.select()" min="0" max="999999999" v-model="spsERCE" />
                        </label>
                    </div>

                </div>
            </div>


            <div class="a_slide" v-bind:class="{ active: sh_bb }">
                <p class="sect_title">子女<a href="javascript:void(0);" class="icon_info" v-tooltip.bottom.end="{ html: 'bb_info' }">&nbsp;</a></p>
                <div class="cont">
                    <label for="NBbb"><span class="label_text lbl_large">課稅年度出生子女人數</span><!-- <input id="NBbb" type="text" v-model="NBbb" v-on:change="D3aOnChange()" /> <!- -  STCIn21 -->
                    <quantity v-bind:min="s_bb_min" v-bind:max="s_bb_max" v-model="NBbb" v-on:drag-end="D3aOnChange()"></quantity>
                    </label>
                    <label v-if="NBbb > 0" for="NBbb_DIS"><span class="label_text">當中符合傷殘受養人免稅額人數</span><!--<input id="NBbb_DIS" type="text" v-model="NBbb_DIS" v-on:change="D4aOnChange()" /> <!- -  STCIn10 -->
                    <quantity v-bind:min="s_bb_min" v-bind:max="NBbb" v-model="NBbb_DIS" v-on:drag-end="D4aOnChange()"></quantity>
                    </label>

                    <label for="CAbb"><span class="label_text lbl_large">其他年度出生子女人數</span><!-- <input id="CAbb" type="text" v-model="CAbb" v-on:input="D3OnChange()" /> <!- -   STCIn4 -->
                    <quantity v-bind:min="s_bb_min" v-bind:max="9 - NBbb" v-model="CAbb" v-on:drag-end="D3OnChange()"></quantity>
                    </label>
                    <label v-if="CAbb > 0" for="CAbb_DIS"><span class="label_text">當中符合傷殘受養人免稅額人數</span><!--<input id="CAbb_DIS" type="text" v-model="CAbb_DIS" v-on:change="D4OnChange()" /> <!- -  STCIn22 -->
                    <quantity v-bind:min="s_bb_min" v-bind:max="CAbb" v-model="CAbb_DIS" v-on:drag-end="D4OnChange()"></quantity>
                    </label>

                    <label v-if="martial_status === 'S' && NBbb + CAbb > 0" for="single_parent">
                        <span>你是否單親父母？</span>
                        <div class="switch_cont">
                            <span class="yn">否</span>
                            <switches v-model="single_parent" theme="bootstrap" color="primary"></switches>
                            <span class="yn">是</span>
                            <!-- <input id="single_parent" type="number" v-model="single_parent" /> <!- -  STCIn23 -->
                        </div>
                    </label>
                </div>
            </div>


            <div class="a_slide" v-bind:class="{ active: sh_bb }">
                <p class="sect_title">兄弟姊妹<a href="javascript:void(0);" class="icon_info" v-tooltip.bottom.end="{ html: 'brosis_info' }">&nbsp;</a></p>
                <div class="cont">
                    <label for="brosis_dep"><span class="label_text lbl_large">供養兄弟姊妹人數</span><!-- <input id="brosis_dep" type="text" v-model="brosis_dep" v-on:change="D5OnChange()" /> <!- -   STCIn5 -->
                    <quantity v-bind:min="s_bb_min" v-bind:max="s_bb_max" v-model="brosis_dep" v-on:drag-end="D5OnChange()"></quantity>
                    </label>
                    <!--
                    <vue-slider width="90%" v-model="brosis_dep" v-bind:min="s_bb_min" v-bind:max="s_bb_max" v-bind:tooltip="s_tooltip" v-on:drag-end="D5OnChange()"></vue-slider>
                    -->

                    <label v-if="brosis_dep > 0" for="brosis_dep_DIS"><span class="label_text">當中符合傷殘受養人免稅額人數</span><!--<input id="brosis_dep_DIS" type="text" v-model="brosis_dep_DIS" v-on:change="D6OnChange()" /> <!- -  STCIn11 -->
                    <quantity v-bind:min="s_bb_min" v-bind:max="brosis_dep" v-model="brosis_dep_DIS" v-on:drag-end="D6OnChange()"></quantity>
                    </label>
                    <!--
                    <vue-slider width="90%" v-model="brosis_dep_DIS" v-bind:min="s_bb_min" v-bind:max="brosis_dep" v-bind:tooltip="s_tooltip" v-on:drag-end="D6OnChange()"></vue-slider>
                    -->
                </div>
            </div>


            <div class="a_slide" v-bind:class="{ active: sh_bb }">
                <p class="sect_title">父母／祖父母／外祖父母 - 直系長輩</p>
                <div class="cont">

                    <p class="tiny_title">年滿60歲，或雖未滿60歲、<br>但有資格申索傷殘津貼的直系長輩</p>
                    <label for="resi_parent"><span class="label_text lbl_large">全年與你同住人數</span><a href="javascript:void(0);" class="icon_info" v-tooltip.bottom.end="{ html: 'parent_info' }">&nbsp;</a><!-- <input id="resi_parent" type="text" v-model="resi_parent" v-on:change="D7OnChange()" /> <!- -   STCIn6 -->
                    <quantity v-bind:min="s_Elder_min" v-bind:max="s_Elder_max" v-model="resi_parent" v-on:drag-end="D7OnChange()"></quantity>
                    <!-- <vue-slider width="90%" v-model="resi_parent" v-bind:min="s_Elder_min" v-bind:max="s_Elder_max" v-bind:tooltip="s_tooltip" v-on:drag-end="D7OnChange()"></vue-slider> -->
                    </label>
                    <label v-if="resi_parent > 0" for="resi_parent_DIS"><span class="label_text">當中符合傷殘受養人免稅額人數</span><!--<input id="resi_parent_DIS" type="text" v-model="resi_parent_DIS" v-on:change="D8OnChange()" /> <!- -  STCIn12 -->
                    <quantity v-bind:min="s_Elder_min" v-bind:max="resi_parent" v-model="resi_parent_DIS" v-on:drag-end="D8OnChange()"></quantity>
                    <!-- <vue-slider width="90%" v-model="resi_parent_DIS" v-bind:min="s_Elder_min" v-bind:max="resi_parent" v-bind:tooltip="s_tooltip" v-on:drag-end="D8OnChange()"></vue-slider> -->
                    </label>

                    <label for="non_resi_parent"><span class="label_text lbl_large">並非全年與你同住人數</span><a href="javascript:void(0);" class="icon_info" v-tooltip.bottom.end="{ html: 'parent_info_2' }">&nbsp;</a><!-- <input id="non_resi_parent" type="text" v-model="non_resi_parent" v-on:change="D9OnChange()" /> <!- -   STCIn7 -->
                    <quantity v-bind:min="s_Elder_min" v-bind:max="s_Elder_max" v-model="non_resi_parent" v-on:drag-end="D9OnChange()"></quantity>
                    <!-- <vue-slider width="90%" v-model="non_resi_parent" v-bind:min="s_Elder_min" v-bind:max="s_Elder_max" v-bind:tooltip="s_tooltip" v-on:drag-end="D9OnChange()"></vue-slider> -->
                    </label>
                    <label v-if="non_resi_parent > 0" for="non_resi_parent_DIS"><span class="label_text">當中符合傷殘受養人免稅額人數</span><!--<input id="non_resi_parent_DIS" type="text" v-model="non_resi_parent_DIS" v-on:change="D10OnChange()" /> <!- -  STCIn13 -->
                    <quantity v-bind:min="s_Elder_min" v-bind:max="non_resi_parent" v-model="non_resi_parent_DIS" v-on:drag-end="D10OnChange()"></quantity>
                    <!-- <vue-slider width="90%" v-model="non_resi_parent_DIS" v-bind:min="s_Elder_min" v-bind:max="non_resi_parent" v-bind:tooltip="s_tooltip" v-on:drag-end="D10OnChange()"></vue-slider> -->
                    </label>

                    <p class="tiny_title">55-59歲的直系長輩</p>
                    <label for="resi_parent_5560"><span class="label_text lbl_large">全年與你同住</span><a href="javascript:void(0);" class="icon_info" v-tooltip.bottom.end="{ html: 'parent_5560_info' }">&nbsp;</a><!-- <input id="resi_parent_5560" type="text" v-model="resi_parent_5560" /> <!- -  STCIn17 -->
                    <quantity v-bind:min="s_Elder_min" v-bind:max="s_Elder_max" v-model="resi_parent_5560" v-on:drag-end=""></quantity>
                    <!-- <vue-slider width="90%" v-model="resi_parent_5560" v-bind:min="s_Elder_min" v-bind:max="s_Elder_max" v-bind:tooltip="s_tooltip" v-on:drag-end=""></vue-slider> -->
                    </label>
                    <label for="non_resi_parent_5560"><span class="label_text lbl_large">並非全年與你同住</span><a href="javascript:void(0);" class="icon_info" v-tooltip.bottom.end="{ html: 'parent_5560_info_2' }">&nbsp;</a><!-- <input id="non_resi_parent_5560" type="text" v-model="non_resi_parent_5560" /> <!- -  STCIn18 -->
                    <quantity v-bind:min="s_Elder_min" v-bind:max="s_Elder_max" v-model="non_resi_parent_5560" v-on:drag-end=""></quantity>
                    <!-- <vue-slider width="90%" v-model="non_resi_parent_5560" v-bind:min="s_Elder_min" v-bind:max="s_Elder_max" v-bind:tooltip="s_tooltip" v-on:drag-end=""></vue-slider> -->
                    </label>
                    
                </div>
            </div>


            <div v-if="martial_status === 'M'" class="a_slide" v-bind:class="{ active: sh_bb }">
                <div class="cont">

                    <label v-if="martial_status === 'M'" for="spouse_disabled_dependent_DIS">
                        <span>傷殘配偶受養人</span>
                        <div class="switch_cont">
                            <span class="yn">否</span>
                            <switches v-if="martial_status === 'M'" v-model="spouse_disabled_dependent_DIS" theme="bootstrap" color="primary"></switches>
                            <span class="yn">是</span>
                            <!-- <input id="spouse_disabled_dependent_DIS" type="number" v-model="spouse_disabled_dependent_DIS" /> <!- -  STCIn9 -->
                        </div>
                    </label>
                </div>
            </div>

        </div>

        <div class="footer">
            <!-- <p># 2019/20年度新增兩個稅務扣減項目，分別是自願醫保保費，以及年金及強積金自願供款。當中年金及強積金自願供款扣減尚待立法會通過相關條例，該扣除上限為每人每年60,000元。</p> -->
            <p>本計稅機不會收集任何可追溯到用戶身分的資料，上述結果乃根據讀者輸入的資料計算，僅適合香港居民計算其應繳之薪俸稅或個人入息課稅稅款，結果或與實際數目有出入，僅供讀者作參考之用。詳情可參考<a href="https://www.ird.gov.hk/" target="_blank">稅務局網站</a>所載資料。</p>
            <p>資料來源：稅務局、20/21及21/22年度財政預算案</p>
        </div>


      <h2 style="display: none;">Output</h2>
      <!--  onday_onday(10) -->
      <taxNewYear v-if="false" v-bind:STCIn8='STCIn8' v-bind:martial_status='martial_status' v-bind:slfIncome='slfIncome' v-bind:spsIncome='spsIncome' v-bind:slfResi='slfResi' v-bind:spsResi='spsResi' v-bind:slfOE='slfOE' v-bind:spsOE='spsOE' v-bind:slfSEE='slfSEE' v-bind:spsSEE='spsSEE' v-bind:slfDona='slfDona' v-bind:spsDona='spsDona' v-bind:slfMpf='slfMpf' v-bind:spsMpf='spsMpf' v-bind:slfLoan='slfLoan' v-bind:spsLoan='spsLoan' v-bind:s_Elder_min='s_Elder_min' v-bind:s_Elder_max='s_Elder_max' v-bind:s_tooltip='s_tooltip' v-bind:slfElder='slfElder' v-bind:slfDisdep='slfDisdep' v-bind:slfERCE='slfERCE' v-bind:spsElder='spsElder' v-bind:spsDisdep='spsDisdep' v-bind:spsERCE='spsERCE' v-bind:s_bb_min='s_bb_min' v-bind:s_bb_max='s_bb_max' v-bind:NBbb='NBbb' v-bind:CAbb='CAbb' v-bind:single_parent='single_parent' v-bind:brosis_dep='brosis_dep' v-bind:resi_parent='resi_parent' v-bind:non_resi_parent='non_resi_parent' v-bind:resi_parent_5560='resi_parent_5560' v-bind:non_resi_parent_5560='non_resi_parent_5560' v-bind:NBbb_DIS='NBbb_DIS' v-bind:CAbb_DIS='CAbb_DIS' v-bind:brosis_dep_DIS='brosis_dep_DIS' v-bind:resi_parent_DIS='resi_parent_DIS' v-bind:non_resi_parent_DIS='non_resi_parent_DIS' v-bind:spouse_disabled_dependent_DIS='spouse_disabled_dependent_DIS' v-bind:STCMainRV='STCMainRV' v-bind:STCOut1='STCOut1'
      v-bind:slfMedInsu='slfMedInsu'
      v-bind:spsMedInsu='spsMedInsu'
      v-bind:slfMedInsu_ppl='slfMedInsu_ppl'
      v-bind:spsMedInsu_ppl='spsMedInsu_ppl'
      v-bind:self_disabled_DIS='self_disabled_DIS'
      v-bind:sps_disabled_DIS='sps_disabled_DIS'
      v-bind:end='end' ></taxNewYear>
      
      <table v-if="false" class="tax2017" border="1" width="100%" style="margin: 0 0 500px;">
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
                                  <td width="75%" v-if="STCMainRV === 42" align="right" class="formulated">{{ STCOut1[13] }}</td>
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
              <tr v-if="false && STCMainRV === 22 || STCMainRV === 10">
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
        <p>課稅年度內總收入<a href="https://www.gov.hk/tc/residents/taxes/salaries/salariestax/chargeable/index.htm" target="_blank">（詳情）</a></p>
    </div>
    <div class="tool_tips" id="oe_info">
        <p>完全、純粹及必須為產生該評稅入息而招致的所有支出及開支<a href="http://www.gov.hk/tc/residents/taxes/salaries/allowances/deductions/index.htm" target="_blank">（詳情）</a></p>
    </div>
    <div class="tool_tips" id="eduexp_info">
        <p>上限$100,000<a href="http://www.gov.hk/tc/residents/taxes/salaries/allowances/deductions/selfeducation.htm" target="_blank">（詳情）</a></p>
    </div>
    <div class="tool_tips" id="donation_info">
        <p><span v-if="martial_status !== 'M'">下限為100元，上限為入息的35%</span><span v-if="martial_status === 'M'">下限為100元，上限為入息的35%，你可把餘下的慈善捐款數額於配偶一方內輸入</span><a href="http://www.gov.hk/tc/residents/taxes/salaries/allowances/deductions/approveddonation.htm" target="_blank">（詳情）</a></p>
    </div>
    <div class="tool_tips" id="mpf_info">
        <p>課稅年度內的總供款；上限$18,000<a href="http://www.ird.gov.hk/chi/pdf/pam38c.pdf" target="_blank">（詳情）</a>。</p>
    </div>
    <div class="tool_tips" id="book_info">
        <p>課稅年度內的總支出；上限$10,000<a href="http://www.ird.gov.hk/chi/pdf/pam38c.pdf" target="_blank">（詳情）</a>。</p>
    </div>
    <div class="tool_tips" id="homeloan_info">
        <p>只供業主作答；上限$100,000<a href="http://www.gov.hk/tc/residents/taxes/salaries/allowances/deductions/homeloan.htm" target="_blank">（詳情）</a></p>
    </div>
    <div class="tool_tips" id="residence_info">
        <p>上限為入息10%<a href="http://www.gov.hk/tc/residents/taxes/salaries/salariestax/chargeable/residence.htm" target="_blank">（詳情）</a></p>
    </div>
    <div class="tool_tips" id="medic_insu_info">
        <p>合資格自願醫保計劃保單保費，每名受保人上限$8,000，<a href="https://www.ird.gov.hk/chi/ppr/archives/18103103.htm" target="_blank">（詳情）</a></p>
    </div>
    <div class="tool_tips" id="medic_insu_amt_info">
        <p>假設每份保單年供款低於$8,000<a href="https://www.budget.gov.hk/2018/chi/index.html" target="_blank">（詳情）</a></p>
    </div>

    <div class="tool_tips" id="elderly_info">
        <p>上限：4人</p>
    </div>
    <div class="tool_tips" id="elderly_info_2">
        <p>上限：4人</p>
    </div>
    <div class="tool_tips" id="eldresi_amt_info">
        <p>每位受養人上限$120,000</p>
    </div>
    <div class="tool_tips" id="eldresi_amt_info_2">
        <p>每位受養人上限$100,000</p>
    </div>
    <div class="tool_tips" id="bb_info">
        <p>上限：9人</p>
    </div>
    <div class="tool_tips" id="brosis_info">
        <p>上限：9人</p>
    </div>
    <div class="tool_tips" id="parent_info">
        <p>上限：4人</p>
    </div>
    <div class="tool_tips" id="parent_info_2">
        <p>上限：4人</p>
    </div>
    <div class="tool_tips" id="parent_5560_info">
        <p>上限：4人</p>
    </div>
    <div class="tool_tips" id="parent_5560_info_2">
        <p>上限：4人</p>
    </div>
    <div class="tool_tips" id="self_DIS_info">
        <p>18／19預算案新增$75,000免稅額(你需要有入息)</p>
    </div>
    <div class="tool_tips" id="sps_DIS_info">
        <p>18／19預算案新增$75,000免稅額(配偶需要有入息)</p>
    </div>
    <!-- <div class="tool_tips" id="sps_iang_visa_info">
        <p>20／21預算案新增$75,000免稅額(配偶需要有入息)</p>
    </div> -->
    <!-- <div class="tool_tips" id="self_iang_visa_info">
        <p>20／21預算案新增$75,000免稅額(你需要有入息)</p>
    </div> -->
    <!-- MOCK adding number type item and the amount have limitation -->
    <div class="tool_tips" id="single_disease_expense_info">
        <p>20／21預算案新增$6,000免稅額(你需要有入息)</p>
    </div>
    <div class="tool_tips" id="slf_disease_expense_info">
        <p>20／21預算案新增$6,000免稅額(你需要有入息)；政府亦建議須繳稅的夫婦之間可分配防疫開支，以申請合共12,000元的扣除總額；</p>
    </div>
    <div class="tool_tips" id="sps_disease_expense_info">
        <p>20／21預算案新增$6,000免稅額(配偶需要有入息)；政府亦建議須繳稅的夫婦之間可分配防疫開支，以申請合共12,000元的扣除總額；</p>
    </div>
    <div class="tool_tips" id="volunMpf_info">
        <p>年金保費及強積金自願性供款，每名受保人上限$60,000；政府亦建議須繳稅的夫婦之間可分配延期年金保費的稅務扣除，以申請合共120,000元的扣除總額；</p>
    </div>
    <div class="tool_tips" id="volunMpf_info2">
        <p>年金保費及強積金自願性供款，每名受保人上限$60,000；政府亦建議須繳稅的夫婦之間可分配延期年金保費的稅務扣除，以申請合共120,000元的扣除總額；</p>
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
