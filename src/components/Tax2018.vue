<template>
    <div class="tax_result">
        <div class="result_cont">
        </div>

        <div class="tax t2018">
            <button class="result_butn" v-on:click="pop_up()" v-bind:class="{ hide: sh_result }">計吓要交幾多稅！</button>
            <div class="saved" v-bind:class="{ hide: !sh_result }">
                <p v-if="martial_status !== 'M'">要交幾多稅：${{ ('' + STCOut2[30]).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</p>
                <p v-if="martial_status === 'M' && STCOut2[32] >= STCOut2[33]">要交幾多稅：${{ ('' + STCOut2[32]).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}（分開評稅）</p>
                <p v-if="martial_status === 'M' && ''+STCOut2[33] !== '0' && STCOut2[32] < STCOut2[33]">要交幾多稅：${{ ('' + STCOut2[33]).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}（合併評稅）</p>
            </div>
            <button class="reset_butn" v-on:click="reset_form()"><span class="access0">重計</span></button>
        </div>

        <div class="tax difference">
            <p class="diff_title">今年慳到</p>
            <p class="diff_value" v-if="martial_status !== 'M'" v-bind:class="{ less: STCOut2[30] - STCOut1[30] < 0 }">
                <span class="big_save">{{ ('' + (STCOut2[30] - STCOut1[30])).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</span>元
            </p>
            <p class="diff_value" v-if="martial_status === 'M' && STCOut2[32] >= STCOut2[33]" v-bind:class="{ less: STCOut2[32] - STCOut1[32] < 0 }">
                <span class="big_save">{{ ('' + (STCOut2[32] - STCOut1[32])).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</span>元
            </p>
            <p class="diff_value" v-if="martial_status === 'M' && ''+STCOut2[33] !== '0' && STCOut2[32] < STCOut2[33]" v-bind:class="{ less: STCOut2[33] - STCOut1[33] < 0 }">
                <span class="big_save">{{ ('' + (STCOut2[33] - STCOut1[33])).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</span>元
            </p>
        </div>
    
    
        <div class="footer">
            <p>本計稅機不會收集任何可追溯到用戶身分的資料，上述結果乃根據讀者輸入的資料計算，僅適合香港居民計算其應繳之薪俸稅或個人入息課稅稅款，結果或與實際數目有出入，僅供讀者作參考之用。詳情可參考<a href="https://www.ird.gov.hk/" target="_blank">稅務局網站</a>所載資料。</p>
            <p>資料來源：稅務局、18/19年度財政預算案</p>
        </div>


        <modal name="new_budget" height="auto" :scrollable="true" :adaptive="true" :maxWidth="420">
            <p class="nb_pay" v-if="martial_status !== 'M'">你要交幾多稅？
                <span class="pay_amt">{{ ('' + STCOut2[30]).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}元</span>
            </p>
            <p class="nb_pay" v-if="martial_status === 'M' && STCOut2[32] >= STCOut2[33]">你要交幾多稅？
                <span class="pay_amt">{{ ('' + STCOut2[32]).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}元</span>（分開評稅）
            </p>
            <p class="nb_pay" v-if="martial_status === 'M' && ''+STCOut2[33] !== '0' && STCOut2[32] < STCOut2[33]">你要交幾多稅？
                <span class="pay_amt">{{ ('' + STCOut2[33]).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}元</span>（合併評稅）
            </p>
            <table class="new_budget" cellspacing="0" cellpadding="0" dir="ltr" border="0">
                <tbody>
                    <tr>
                        <td width="*">一齊睇睇慳咗喺邊：</td>
                        <td width="20%">&nbsp;</td>
                        <td width="16">&nbsp;</td>
                        <td width="20%">&nbsp;</td>
                    </tr>
                    <tr>
                        <td><strong>措施</strong></td>
                        <td><strong>舊</strong></td>
                        <td>&nbsp;</td>
                        <td><strong>新</strong></td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                        <td>（港元）</td>
                        <td>&nbsp;</td>
                        <td>（港元）</td>
                    </tr>
                    <tr>
                        <td>寬減75%薪俸稅和個人入息課稅（上限）</td>
                        <td>20,000</td>
                        <td>&nbsp;</td>
                        <td>30,000</td>
                    </tr>
                    <tr>
                        <td>寬減75%利得稅</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>薪俸稅邊際稅階</td>
                        <td>45,000</td>
                        <td>→</td>
                        <td>60,000</td>
                    </tr>
                    <tr>
                        <td>傷殘受養人免稅額</td>
                        <td>75,000</td>
                        <td>→</td>
                        <td>80,000</td>
                    </tr>
                    <tr>
                        <td>供養兄弟姊妹免稅額</td>
                        <td>37,500</td>
                        <td>→</td>
                        <td>40,000</td>
                    </tr>
                    <tr>
                        <td>供養60歲或以上的直系長輩免稅額</td>
                        <td>46,000</td>
                        <td>→</td>
                        <td>50,000</td>
                    </tr>
                    <tr>
                        <td>供養55至59歲的直系長輩免稅額</td>
                        <td>23,000</td>
                        <td>→</td>
                        <td>30,000</td>
                    </tr>
                    <tr>
                        <td>直系長輩入住安老院舍的住宿照顧開支</td>
                        <td>92,000</td>
                        <td>→</td>
                        <td>100,000</td>
                    </tr>
                    <tr>
                        <td>居所貸款利息最高扣減額</td>
                        <td>100,000</td>
                        <td>→</td>
                        <td>120,000</td>
                    </tr>
                    <tr>
                        <td>個人進修開支最高扣除額</td>
                        <td>100,000</td>
                        <td>→</td>
                        <td>120,000</td>
                    </tr>
                    <tr>
                        <td>自願醫保扣稅額（NEW）</td>
                        <td>無</td>
                        <td>→</td>
                        <td>5,000</td>
                    </tr>
                    <tr>
                        <td>基本免稅額</td>
                        <td>132000</td>
                        <td>→</td>
                        <td>145,000</td>
                    </tr>
                    <tr>
                        <td>單親免稅額</td>
                        <td>132000</td>
                        <td>→</td>
                        <td>150,000</td>
                    </tr>
                    <tr>
                        <td>已婚人士免稅額</td>
                        <td>264000</td>
                        <td>→</td>
                        <td>290,000</td>
                    </tr>
                </tbody>
            </table>
            <p class="nb_save" v-if="martial_status !== 'M'" v-bind:class="{ less: STCOut2[30] - STCOut1[30] < 0 }">
                今年慳到 <span class="save_amt">{{ ('' + (STCOut2[30] - STCOut1[30])).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}元</span>
            </p>
            <p class="nb_save" v-if="martial_status === 'M' && STCOut2[32] >= STCOut2[33]" v-bind:class="{ less: STCOut2[32] - STCOut1[32] < 0 }">
                今年慳到 <span class="save_amt">{{ ('' + (STCOut2[32] - STCOut1[32])).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}元（分開評稅）</span>
            </p>
            <p class="nb_save" v-if="martial_status === 'M' && ''+STCOut2[33] !== '0' && STCOut2[32] < STCOut2[33]" v-bind:class="{ less: STCOut2[33] - STCOut1[33] < 0 }">
                今年慳到 <span class="save_amt">{{ ('' + (STCOut2[33] - STCOut1[33])).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}元（合併評稅）</span>
            </p>
        </modal>
    
    </div>
</template>

<script>
import * as aliasTax2018 from './Tax2018_data'
export default aliasTax2018
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
