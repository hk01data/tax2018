<template>
    <div class="tax_result">
        <div class="result_cont">
            <button class="result_butn" v-on:click="toggleClass('sh_result')">今年慳幾多</button>
            <button class="reset_butn" v-on:click="reset_form()">清空</button>
        </div>

        <div class="difference" v-bind:class="{ hide: !sh_result }">
            <p v-if="martial_status !== 'M'" v-bind:class="{ less: STCOut2[30] - STCOut1[30] < 0 }">
                差異: ${{ ('' + (STCOut2[30] - STCOut1[30])).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
            </p>
            <p v-if="martial_status === 'M'" v-bind:class="{ less: STCOut2[32] - STCOut1[32] < 0 }">
                分開計算: ${{ ('' + (STCOut2[32] - STCOut1[32])).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
            </p>
            <p v-if="martial_status === 'M'" v-bind:class="{ less: STCOut2[33] - STCOut1[33] < 0 }">
                合併計算: ${{ ('' + (STCOut2[33] - STCOut1[33])).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
            </p>
        </div>

        <div class="tax t2017" style="float:left">
            <p>2017-18年度</p>
            <p v-if="STCOut1[2] < STCOut1[0]">總入息: ${{ ('' + STCOut1[0]).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</p>
            <p v-if="STCOut1[2] >= STCOut1[0]">總入息: ${{ ('' + STCOut1[2]).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</p>
            <p v-if="STCOut1[26] < STCOut1[24]">總免稅額: ${{ ('' + STCOut1[24]).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</p>
            <p v-if="STCOut1[26] >= STCOut1[24]">總免稅額: ${{ ('' + STCOut1[26]).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</p>
            <p v-if="martial_status !== 'M'">應繳稅款: ${{ ('' + STCOut1[30]).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</p>
            <p v-if="martial_status === 'M'">分開: ${{ ('' + STCOut1[32]).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</p>
            <p v-if="martial_status === 'M' && ''+STCOut1[33] !== '0'">合併: ${{ ('' + STCOut1[33]).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</p>
        </div>
      
        <div class="tax t2018" style="float:right">
            <p>2018-19年度</p>
            <p v-if="STCOut2[2] < STCOut2[0]">總入息: ${{ ('' + STCOut2[0]).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</p>
            <p v-if="STCOut2[2] >= STCOut2[0]">總入息: ${{ ('' + STCOut2[2]).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</p>
            <p v-if="STCOut2[26] < STCOut2[24]">總免稅額: ${{ ('' + STCOut2[24]).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</p>
            <p v-if="STCOut2[26] >= STCOut2[24]">總免稅額: ${{ ('' + STCOut2[26]).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</p>
            <p v-if="martial_status !== 'M'">應繳稅款: ${{ ('' + STCOut2[30]).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</p>
            <p v-if="martial_status === 'M'">分開: ${{ ('' + STCOut2[32]).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</p>
            <p v-if="martial_status === 'M' && ''+STCOut2[33] !== '0'">合併: ${{ ('' + STCOut2[33]).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</p>
        </div>
    
        <div class="footer">
            <p>稅款計算機計算所得的應繳稅款只供參考，它的準確程度視乎你是否輸入正確資料。本網站不會負責因使用該稅款計算機而造成的任何損失或損壞，詳情請參考稅務局網站。</p>                    
        </div>
    
    </div>
</template>

<script>
import * as aliasTax2018 from './Tax2018_data'
export default aliasTax2018
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
