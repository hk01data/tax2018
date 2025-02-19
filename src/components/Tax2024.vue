<template>
    <div class="">
            <table v-if="false" class="tax2018" border="1" width="100%" style="display: block; margin: 0 0 0;">
                <tbody>
                    <tr>
                        <td><h2>2018</h2></td>
                    </tr>
                    <tr>
                        <td width="46%">總 入 息</td>
                        <td width="18%" v-if="STCMainRV !== 24">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr>
                                        <td width="75%" align="right" class="formulated">{{ STCOut2[0] }}</td>
                                        <td width="25%" align="center">&nbsp;</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td width="18%" v-if="STCMainRV !== 22 && STCMainRV !== 10">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr>
                                        <td width="75%" align="right" class="formulated">{{ STCOut2[1] }}</td>
                                        <td width="25%" align="center">&nbsp;</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td width="18%" v-if="STCMainRV !== 24 && STCMainRV !== 22 && STCMainRV !== 10" align="right" class="formulated">{{ STCOut2[2] }}</td>
                    </tr>
                    <tr>
                        <td width="46%">扣 除 額</td>
                        <td width="18%" v-if="STCMainRV !== 24">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr>
                                        <td width="75%" align="right" class="formulated">{{ STCOut2[57] }}</td>
                                        <td width="25%" align="center">&nbsp;</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td width="18%" v-if="STCMainRV !== 22 && STCMainRV !== 10">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr>
                                        <td width="75%" align="right" class="formulated">{{ STCOut2[58] }}</td>
                                        <td width="25%" align="center">&nbsp;</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td width="18%" v-if="STCMainRV !== 24 && STCMainRV !== 22 && STCMainRV !== 10" align="right" class="formulated">{{ STCOut2[59] }}</td>
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
                                        <td width="75%" align="right" class="formulated">{{ STCOut2[3] }}</td>
                                        <td width="25%" align="center">&nbsp;</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td width="18%" v-if="STCMainRV !== 24 && STCMainRV !== 22 && STCMainRV !== 10">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr>
                                        <td width="75%" align="right" class="formulated">{{ STCOut2[3] }}</td>
                                        <td width="25%" align="center">&nbsp;</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td width="18%" v-if="STCMainRV === 24 || STCMainRV === 22 || STCMainRV === 30 || STCMainRV === 40 || STCMainRV === 42 || STCMainRV === 45" align="right" class="formulated">{{ STCOut2[4] }}&nbsp;&nbsp;&nbsp;</td>
                    </tr>
                    <tr v-if="STCMainRV === 10">
                        <td width='80%'>&nbsp;&nbsp;&nbsp;&nbsp;單 親</td>
                        <td width='20%' align='right'>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr>
                                        <td width="75%" align="right" class="formulated">{{ STCOut2[5] }}</td>
                                        <td width="25%" align="center">&nbsp;</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <!-- Single Column + 1row -->
                    <tr v-if="(STCOut2[77] === 0 && STCOut2[76] === 0) && (STCMainRV === 24 || STCMainRV === 22 || STCMainRV === 10)">
                        <td width='80%'>&nbsp;&nbsp;&nbsp;&nbsp;子 女</td>
                        <td width='20%' v-if="STCMainRV === 22 || STCMainRV === 10" align='right' class="formulated">{{ STCOut2[6] }}</td>
                        <td width='20%' v-if="STCMainRV === 24" align='right' class="formulated">{{ STCOut2[12] }}</td>
                    </tr>
                    <!-- Single Column + 3row -->
                    <tr v-if="(STCOut2[77] > 0 || STCOut2[76] > 0) && (STCMainRV === 24 || STCMainRV === 22 || STCMainRV === 10)">
                        <td width="46%">&nbsp;&nbsp;&nbsp;&nbsp;子 女</td>
                        <td width="18%">&nbsp;</td>
                    </tr>
                    <tr v-if="STCOut2[77] > 0 || STCOut2[76] > 0 && (STCMainRV === 24 || STCMainRV === 22 || STCMainRV === 10)">
                        <td width="46%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 在 課 稅 年 度 內 出 生</td>
                        <td width='20%' v-if="STCMainRV === 22 || STCMainRV === 10" align='right' class="formulated">{{ STCOut2[73] }}</td>
                        <td width='20%' v-if="STCMainRV === 24" align='right' class="formulated">{{ STCOut2[74] }}</td>
                    </tr>
                    <tr v-if="STCOut2[77] > 0 || STCOut2[76] > 0 && (STCMainRV === 24 || STCMainRV === 22 || STCMainRV === 10)">
                        <td width="46%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 在 其 他 課 稅 年 度 出 生</td>
                        <td width='20%' v-if="STCMainRV === 22 || STCMainRV === 10" align='right' class="formulated">{{ STCOut2[6] }}</td>
                        <td width='20%' v-if="STCMainRV === 24" align='right' class="formulated">{{ STCOut2[12] }}</td>
                    </tr>
                    <!-- Multi Column + 1row -->
                    <tr v-if="(STCOut2[77] === 0 && STCOut2[76] === 0) && (STCMainRV === 30 || STCMainRV === 40 || STCMainRV === 42 || STCMainRV === 45)">
                        <td width='46%'>&nbsp;&nbsp;&nbsp;&nbsp;子 女 [nMin: {{nMin}}] - [STCIn21: {{STCIn21}} ] - [STCOut2[12]: {{STCOut2[12]}} ] - [STCIn4: {{STCIn4}}]</td>
                        <!-- cell left -->
                        <td width="18%">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr>
                                        <td width="75%" v-if="STCMainRV === 30 || STCMainRV === 40" align="right" class="formulated" data-taxtype="{}">{{ STCOut2[6] }}</td>
                                        <td width="75%" v-if="STCMainRV === 42" align="right" class="formulated" data-taxtype="{}">0</td>
                                        <td width="75%" v-if="STCMainRV === 45" align="right" class="formulated" data-taxtype="{}">(0)</td>
                                        <td width="25%" v-if="STCMainRV === 30" align="center">
                                            <font color="#FF0000">({{ STCOut2[37] }})</font>
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
                                        <td width="75%" v-if="STCMainRV === 30 || STCMainRV === 40" align="right" class="formulated" data-taxtype="{}">{{ STCOut2[12] }}</td>
                                        <td width="75%" v-if="STCMainRV === 42 || STCMainRV === 45" align="right" class="formulated" data-taxtype="{}">{{ STCOut2[18] }}</td>
                                        <td width="25%" v-if="STCMainRV === 30 || STCMainRV === 45" align="center">
                                            <font v-if="STCMainRV === 30" color="#FF0000">({{ STCOut2[41] }})</font>
                                            <font v-if="STCMainRV === 45" color="#FF0000">({{ STCOut2[37] + STCOut2[41] }})</font>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <!-- cell right -->
                        <td width="18%" align="right" class="formulated" data-taxtype="{}">{{ STCOut2[18] }}</td>
                    </tr>



                    <!-- Multi Column + 3row -->
                    <tr v-if="(STCOut2[77] > 0 || STCOut2[76] > 0) && (STCMainRV === 30 || STCMainRV === 40 || STCMainRV === 42 || STCMainRV === 45)">
                        <td width='46%'>&nbsp;&nbsp;&nbsp;&nbsp;子 女</td>
                        <td width="18%">&nbsp;</td>
                        <td width="18%">&nbsp;</td>
                        <td width="18%">&nbsp;</td>
                    </tr>
                    <tr v-if="(STCOut2[77] > 0 || STCOut2[76] > 0) && (STCMainRV === 30 || STCMainRV === 40 || STCMainRV === 42 || STCMainRV === 45)">
                        <td width="46%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 在 課 稅 年 度 內 出 生</td>
                        <td width="18%">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr>
                                        <td width="75%" v-if="STCMainRV === 30 || STCMainRV === 40" align="right" class="formulated" data-taxtype="{}">{{ STCOut2[73] }}</td>
                                        <td width="75%" v-if="STCMainRV === 42 || STCMainRV === 45" align="right" class="formulated" data-taxtype="{}">(0)</td>
                                        <td width="25%" align="center" v-if="STCMainRV !== 10">
                                            <font v-if="STCMainRV === 30" color="#FF0000">({{ STCOut2[76] }})</font>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td width="18%">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr>
                                        <td width="75%" v-if="STCMainRV === 30 || STCMainRV === 40" align="right" class="formulated" data-taxtype="{}">{{ STCOut2[74] }}</td>
                                        <td width="75%" v-if="STCMainRV === 42 || STCMainRV === 45" align="right" class="formulated" data-taxtype="{}">{{ STCOut2[75] }}</td>
                                        <td width="25%" align="center" v-if="STCMainRV !== 10">
                                            <font v-if="STCMainRV === 30" color="#FF0000">({{ STCOut2[77] }})</font>
                                            <font v-if="STCMainRV === 45" color="#FF0000">({{ STCOut2[76] + STCOut2[77] }})</font>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td width="18%" align="right" class="formulated" data-taxtype="{}">{{ STCOut2[75] }}</td>
                    </tr>
                    <tr v-if="(STCOut2[77] > 0 || STCOut2[76] > 0) && (STCMainRV === 30 || STCMainRV === 40 || STCMainRV === 42 || STCMainRV === 45)">
                        <td width="46%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 在 其 他 課 稅 年 度 出 生</td>
                        <td width="18%">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr>
                                        <td width="75%" v-if="STCMainRV === 30 || STCMainRV === 40" align="right" class="formulated" data-taxtype="{}">{{ STCOut2[6] }}</td>
                                        <td width="75%" v-if="STCMainRV === 42 || STCMainRV === 45" align="right" class="formulated" data-taxtype="{}">(0)</td>
                                        <td width="25%" align="center" v-if="STCMainRV !== 10">
                                            <font v-if="STCMainRV === 30" color="#FF0000">({{ STCOut2[37] }})</font>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td width="18%">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr>
                                        <td width="75%" v-if="STCMainRV === 30 || STCMainRV === 40" align="right" class="formulated" data-taxtype="{}">{{ STCOut2[12] }}</td>
                                        <td width="75%" v-if="STCMainRV === 42 || STCMainRV === 45" align="right" class="formulated" data-taxtype="{}">{{ STCOut2[18] }}</td>
                                        <td width="25%" align="center" v-if="STCMainRV !== 10">
                                            <font v-if="STCMainRV === 30" color="#FF0000">({{ STCOut2[41] }})</font>
                                            <font v-if="STCMainRV === 45" color="#FF0000">({{ STCOut2[37] + STCOut2[41] }})</font>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td width="18%" align="right" class="formulated" data-taxtype="{}">{{ STCOut2[18] }}</td>
                    </tr>

                    <!-- Single Column -->
                    <tr v-if="STCMainRV === 24 || STCMainRV == 22 || STCMainRV == 10">
                        <td width='80%'>&nbsp;&nbsp;&nbsp;&nbsp;供 養 兄 弟 / 姊 妹</td>
                        <td width='20%' v-if="STCMainRV !== 24" align='right'>{{ STCOut2[7] }}</td>
                        <td width='20%' v-if="STCMainRV === 24" align='right'>{{ STCOut2[13] }}</td>
                    </tr>
                    <!-- Multi Column -->
                    <tr v-if="STCMainRV === 30 || STCMainRV == 40 || STCMainRV == 42 || STCMainRV == 45">
                        <td width="46%">&nbsp;&nbsp;&nbsp;&nbsp;供 養 兄 弟 / 姊 妹 [oMin: {{ oMin }} ][STCIn5: {{ STCIn5 }}]</td>
                        <!-- cell left -->
                        <td width="18%">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr>
                                        <td width="75%" v-if="STCMainRV === 30 || STCMainRV === 40" align="right" class="formulated">{{ STCOut2[7] }}</td>
                                        <td width="75%" v-if="STCMainRV === 42" align="right" class="formulated">{{ STCOut2[13] }}</td>
                                        <td width="75%" v-if="STCMainRV === 45" align="right" class="formulated">0</td>
                                        <td width="25%" align="center">
                                            <font v-if="STCMainRV === 30" color="#FF0000">({{ STCOut2[38] }})</font>
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
                                        <td width="75%" v-if="STCMainRV === 30 || STCMainRV === 40" align="right" class="formulated" data-taxtype="{}">{{ STCOut2[13] }}</td>
                                        <td width="75%" v-if="STCMainRV === 42 || STCMainRV === 45" align="right" class="formulated" data-taxtype="{}">{{ STCOut2[19] }}</td>
                                        <td width="25%" align="center">
                                            <font v-if="STCMainRV === 30" color="#FF0000">({{ STCOut2[42] }})</font>
                                            <font v-if="STCMainRV === 45" color="#FF0000">({{ STCOut2[38] + STCOut2[42] }})</font>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <!-- cell right -->
                        <td width="18%" align="right" class="formulated" data-taxtype="{}">{{ STCOut2[19] }}</td>
                    </tr>


                    <!-- Single Column -->
                    <tr v-if="STCMainRV === 24 || STCMainRV === 22 || STCMainRV === 10">
                        <td width='80%'>&nbsp;&nbsp;&nbsp;&nbsp;供 養 父 母 / 祖 父 母 或 外 祖 父 母</td>
                        <td width='20%' align='right'>&nbsp;</td>
                    </tr>
                    <tr v-if="STCMainRV === 24 || STCMainRV === 22 || STCMainRV === 10">
                        <td width='80%'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 年 齡 為 55 至 59 歲</td>
                        <td width='20%' v-if="STCMainRV !== 24" align='right'>{{ STCOut2[60] }}</td>
                        <td width='20%' v-if="STCMainRV === 24" align='right'>{{ STCOut2[63] }}</td>
                    </tr>
                    <tr v-if="STCMainRV === 24 || STCMainRV === 22 || STCMainRV === 10">
                        <td width='80%'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 年 滿 60 歲 或 以 上 ， 或 雖 未 滿 60 歲 ， 但 屬 傷 殘 人 士</td>
                        <td width='20%' v-if="STCMainRV !== 24" align='right'>{{ STCOut2[8] }}</td>
                        <td width='20%' v-if="STCMainRV === 24" align='right'>{{ STCOut2[14] }}</td>
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
                                        <td width="75%" v-if="STCMainRV === 30 || STCMainRV === 40" align="right" class="formulated">{{ STCOut2[61] }}</td>
                                        <td width="75%" v-if="STCMainRV === 42" align="right" class="formulated">0</td>
                                        <td width="75%" v-if="STCMainRV === 45" align="right" class="formulated">(0)</td>
                                        <td width="25%" align="center">
                                            <font color="#FF0000" v-if="STCMainRV === 30">({{ STCOut2[69] }})</font>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td width="18%">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr>
                                        <td width="75%" v-if="STCMainRV === 30 || STCMainRV === 40" align="right" class="formulated">{{ STCOut2[64] }}</td>
                                        <td width="75%" v-if="STCMainRV === 42" align="right" class="formulated">0</td>
                                        <td width="75%" v-if="STCMainRV === 45" align="right" class="formulated">(0)</td>
                                        <td width="25%" align="center">
                                            <font color="#FF0000" v-if="STCMainRV === 30">({{ STCOut2[71] }})</font>
                                            <font color="#FF0000" v-if="STCMainRV === 45">({{ STCOut2[69] + STCOut2[71] }})</font>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td width="18%" align="right" class="formulated" data-taxtype="{}">{{ STCOut2[67] }}</td>
                    </tr>
                    <tr v-if="STCMainRV !== 24 && STCMainRV !== 22 && STCMainRV !== 10">
                        <td width="46%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 年 滿 60 歲 或 以 上 ， 或 雖<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;未 滿 60 歲 ， 但 屬 傷 殘 人 士</td>
                        <td width="18%">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr>
                                        <td width="75%" v-if="STCMainRV === 30 || STCMainRV === 40" align="right" class="formulated">{{ STCOut2[9] }}</td>
                                        <td width="75%" v-if="STCMainRV === 42" align="right" class="formulated">0</td>
                                        <td width="75%" v-if="STCMainRV === 45" align="right" class="formulated">(0)</td>
                                        <td width="25%" align="center">
                                            <font color="#FF0000" v-if="STCMainRV === 30">({{ STCOut2[39] }})</font>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td width="18%">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr>
                                        <td width="75%" v-if="STCMainRV === 30 || STCMainRV === 40" align="right" class="formulated">{{ STCOut2[15] }}</td>
                                        <td width="75%" v-if="STCMainRV === 42 || STCMainRV === 45" align="right" class="formulated">{{ STCOut2[21] }}</td>
                                        <td width="25%" align="center">
                                            <font color="#FF0000" v-if="STCMainRV === 30">({{ STCOut2[43] }})</font>
                                            <font color="#FF0000" v-if="STCMainRV === 45">({{ STCOut2[39] + STCOut2[43] }})</font>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td width="18%" align="right" class="formulated" data-taxtype="{}">{{ STCOut2[21] }}</td>
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
                                        <td width="75%" v-if="STCMainRV === 30 || STCMainRV === 40" align="right" class="formulated">{{ STCOut2[62] }}</td>
                                        <td width="75%" v-if="STCMainRV === 42" align="right" class="formulated">0</td>
                                        <td width="75%" v-if="STCMainRV === 45" align="right" class="formulated">(0)</td>
                                        <td width="25%" align="center">
                                            <font color="#FF0000" v-if="STCMainRV === 30">({{ STCOut2[70] }})</font>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td width="18%">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr>
                                        <td width="75%" v-if="STCMainRV === 30 || STCMainRV === 40" align="right" class="formulated">{{ STCOut2[65] }}</td>
                                        <td width="75%" v-if="STCMainRV === 42 || STCMainRV === 45" align="right" class="formulated">{{ STCOut2[68] }}</td>
                                        <td width="25%" align="center">
                                            <font color="#FF0000" v-if="STCMainRV === 30">({{ STCOut2[72] }})</font>
                                            <font color="#FF0000" v-if="STCMainRV === 45">({{ STCOut2[70] + STCOut2[72] }})</font>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td width="18%" align="right" class="formulated" data-taxtype="{}">{{ STCOut2[68] }}</td>
                    </tr>
                    <tr v-if="STCMainRV !== 24 && STCMainRV !== 22 && STCMainRV !== 10">
                        <td width="46%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 年 滿 60 歲 或 以 上 ， 或 雖<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;未 滿 60 歲 ， 但 屬 傷 殘 人 士</td>
                        <td width="18%">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr>
                                        <td width="75%" v-if="STCMainRV === 30 || STCMainRV === 40" align="right" class="formulated">{{ STCOut2[10] }}</td>
                                        <td width="75%" v-if="STCMainRV === 42" align="right" class="formulated">0</td>
                                        <td width="75%" v-if="STCMainRV === 45" align="right" class="formulated">(0)</td>
                                        <td width="25%" align="center">
                                            <font color="#FF0000" v-if="STCMainRV === 30">({{ STCOut2[40] }})</font>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td width="18%">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr>
                                        <td width="75%" v-if="STCMainRV === 30 || STCMainRV === 40" align="right" class="formulated">{{ STCOut2[16] }}</td>
                                        <td width="75%" v-if="STCMainRV === 42 || STCMainRV === 45" align="right" class="formulated">{{ STCOut2[68] }}</td>
                                        <td width="25%" align="center">
                                            <font color="#FF0000" v-if="STCMainRV === 30">({{ STCOut2[44] }})</font>
                                            <font color="#FF0000" v-if="STCMainRV === 45">({{ STCOut2[40] + STCOut2[44] }})</font>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td width="18%" align="right" class="formulated" data-taxtype="{}">{{ STCOut2[22] }}</td>
                    </tr>

                    <!-- Single Column -->
                    <tr v-if="STCMainRV === 24 || STCMainRV == 22 || STCMainRV == 10">
                        <td width='80%'>&nbsp;&nbsp;&nbsp;&nbsp;傷 殘 受 養 人</td>
                        <td width='20%' v-if="STCMainRV !== 24" align='right'>{{ STCOut2[11] }}</td>
                        <td width='20%' v-if="STCMainRV === 24" align='right'>##{{ STCOut2[17] }}</td>
                    </tr>


                    <!-- Multi Column -->
                    <tr v-if="STCMainRV === 30 || STCMainRV == 40 || STCMainRV == 42 || STCMainRV == 45">
                        <td width="46%">&nbsp;&nbsp;&nbsp;&nbsp;傷 殘 受 養 人</td>
                        <!-- cell left -->
                        <td width="18%">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr>
                                        <td width="75%" v-if="STCMainRV === 30 || STCMainRV === 40" align="right" class="formulated">{{ STCOut2[11] }}</td>
                                        <td width="75%" v-if="STCMainRV === 42" align="right" class="formulated">0</td>
                                        <td width="75%" v-if="STCMainRV === 45" align="right" class="formulated">0</td>
                                        <td width="25%" align="center">
                                            <font v-if="STCMainRV === 30" color="#FF0000">({{ STCOut2[49] }})</font>
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
                                        <td width="75%" v-if="STCMainRV === 30 || STCMainRV === 40" align="right" class="formulated" data-taxtype="{}">{{ STCOut2[17] }}</td>
                                        <td width="75%" v-if="STCMainRV === 42" align="right" class="formulated" data-taxtype="{}">{{ STCOut2[17] + STCOut2[11] }}</td>
                                        <td width="75%" v-if="STCMainRV === 45" align="right" class="formulated" data-taxtype="{}">{{ STCOut2[17] + STCOut2[11] }}</td>
                                        <td width="25%" align="center">
                                            <font v-if="STCMainRV === 30" color="#FF0000">({{ STCOut2[54] }})</font>
                                            <font v-if="STCMainRV === 46" color="#FF0000">({{ STCOut2[49] + STCOut2[54] }})</font>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <!-- cell right -->
                        <td width="18%" align="right" class="formulated" data-taxtype="{}">{{ STCOut2[23] }}</td>
                    </tr>


                    <tr v-if="STCMainRV === 24">
                        <td width='80%'>總 免 稅 額</td>
                        <td width='20%' align='right' class="formulated">{{ STCOut2[25] }}</td>
                    </tr>
                    <tr v-if="STCMainRV === 24">
                        <td width='80%'>應 課 稅 入 息 實 額</td>
                        <td width='20%' align='right' class="formulated">{{ STCOut2[28] }}</td>
                    </tr>
                    <tr v-if="false && STCMainRV === 22 || STCMainRV === 10">
                        <td width='80%'>&nbsp;&nbsp;&nbsp;&nbsp;傷 殘 受 養 人</td>
                        <td width='20%' align='right' class="formulated">{{ STCOut2[11] }}</td>
                    </tr>
                    <tr v-if="STCMainRV === 22 || STCMainRV === 10">
                        <td width='80%'>總 免 稅 額</td>
                        <td width='20%' align='right' class="formulated">{{ STCOut2[24] }}</td>
                    </tr>
                    <tr v-if="STCMainRV === 22 || STCMainRV === 10">
                        <td width='80%'>應 課 稅 入 息 實 額</td>
                        <td width='20%' align='right' class="formulated">{{ STCOut2[27] }}</td>
                    </tr>
                    <tr v-if="STCMainRV !== 24 && STCMainRV !== 22 && STCMainRV !== 10">
                        <td width="46%">總 免 稅 額</td>
                        <td width="18%">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr>
                                        <td width="75%" align="right" class="formulated" data-taxtype="{'-': 0, 'else': 10}">{{ STCOut2[24] }}</td>
                                        <td width="25%" align="center">&nbsp;</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td width="18%">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr>
                                        <td width="75%" align="right" class="formulated" data-taxtype="{}">{{ STCOut2[25] }}</td>
                                        <td width="25%" align="center">&nbsp;</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td width="18%" align="right" class="formulated" data-taxtype="{}">{{ STCOut2[26] }}</td>
                    </tr>
                    <tr v-if="STCMainRV !== 24 && STCMainRV !== 22 && STCMainRV !== 10">
                        <td width="46%">應 課 稅 入 息 實 額</td>
                        <td width="18%">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr>
                                        <td width="75%" align="right" class="formulated" data-taxtype="{'-': 0, 'else': 10}">{{ STCOut2[27] }}</td>
                                        <td width="25%" align="center">&nbsp;</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td width="18%">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr>
                                        <td width="75%" align="right" class="formulated" data-taxtype="{}">{{ STCOut2[28] }}</td>
                                        <td width="25%" align="center">&nbsp;</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td width="18%" align="right" class="formulated" data-taxtype="{}">{{ STCOut2[29] }}</td>
                    </tr>
                    <tr v-if="STCMainRV !== 24 && STCMainRV !== 22 && STCMainRV !== 10">
                        <td width="46%">應 繳 稅 款</td>
                        <td width="18%">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr>
                                        <!-- 標準稅 -->
                                        <!--
                                        <td width="75%" align="right" class="formulated" data-taxtype="{'-': 0, 'else': 10}">{{ STCOut2[30] }}</td>
                                        -->
                                        <!-- 累進稅 -->
                                        <td width="75%" align="right" class="formulated" data-taxtype="{}">{{ STCOut2[30] }}</td>
                                        <td width="25%" align="center">&nbsp;</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td width="18%">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr>
                                        <td width="75%" align="right" class="formulated" data-taxtype="{}">{{ STCOut2[31] }}</td>
                                        <td width="25%" align="center">&nbsp;</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td width="18%" align="right" class="formulated" data-taxtype="{}">{{ STCOut2[33] }}</td>
                    </tr>
                    <tr v-if="STCMainRV !== 24 && STCMainRV !== 22 && STCMainRV !== 10">
                        <td width="46%">你 及 你 配 偶 應 繳 的 總 稅 款</td>
                        <td width="36%" colspan="2" align="center">
                            <font color="#FF0000" class="formulated" data-taxtype="{}">{{ STCOut2[32] }}</font>
                        </td>
                        <td width="18%" align="right" class="formulated" data-taxtype="{'rebate': false}">{{ STCOut2[33] }}</td>
                    </tr>
                    <tr v-if="STCMainRV === 24">
                        <td width='80%'>你 應 繳 的 總 稅 款</td>
                        <td width='20%' align='right'>
                            <font color='#FF0000' class="formulated">{{ STCOut2[31] }}</font>
                        </td>
                    </tr>
                    <tr v-if="STCMainRV === 22 || STCMainRV === 10">
                        <td width='80%'>你 應 繳 的 總 稅 款</td>
                        <td width='20%' align='right'>
                            <font color='#FF0000' class="formulated">{{ STCOut2[30] }}</font>
                        </td>
                    </tr>
                </tbody>
            </table>

    <div class="tax_result">
        <div class="result_cont">
        </div>

        <div class="tax t2018">
            <button class="result_butn" v-on:click="pop_up()" v-bind:class="{ hideX: sh_result }">計吓要交幾多稅！</button>
            <div v-if="false" class="saved" v-bind:class="{ hide: !sh_result }">
                <p v-if="martial_status !== 'M'">要交幾多稅：${{ ('' + STCOut2[30]).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</p>
                <p v-if="martial_status === 'M' && spsIncome === 0 && slfIncome === 0">要交幾多稅：$0</p>
                <p v-if="martial_status === 'M' && spsIncome === 0 && slfIncome !== 0">要交幾多稅：${{ ('' + STCOut2[30]).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}（分開評稅）</p>
                <p v-if="martial_status === 'M' && slfIncome === 0 && spsIncome !== 0">要交幾多稅：${{ ('' + STCOut2[31]).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}（分開評稅）</p>
                <p v-if="martial_status === 'M' && !only_one_income && STCOut2[32] < STCOut2[33]">要交幾多稅：${{ ('' + STCOut2[32]).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}（分開評稅）</p>
                <p v-if="martial_status === 'M' && !only_one_income && STCOut2[32] >= STCOut2[33]">要交幾多稅：${{ ('' + STCOut2[33]).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}（合併評稅）</p>
            </div>
            <button class="reset_butn" v-on:click="reset_form()"><span class="access0">重計</span></button>
            <div v-if="false">
                <p>{{ STCOut2[32] }} {{ STCOut2[33] }}</p>
                <p>{{ STCOut1[32] }} {{ STCOut1[33] }}</p>
                <p>{{ slfIncome }} </p>
                <p>{{ spsIncome }} </p>
                <p>{{ only_one_income }}</p>
            </div>
        </div>

        <!-- debug purpose
        <div v-if="false" class="tax difference">
            <p class="diff_title">較去年少交</p>
            <p class="diff_value" v-if="martial_status !== 'M'" v-bind:class="{ less: STCOut2[30] - STCOut1[30] < 0 }">
                <span class="big_save">{{ ('' + (STCOut2[30] - STCOut1[30])).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</span>元
            </p>
            <p class="diff_value" v-if="martial_status === 'M' && spsIncome === 0 && slfIncome === 0" v-bind:class="{ less: STCOut2[32] - STCOut1[32] < 0 }">
                <span class="big_save">0</span>元
            </p>
            <p class="diff_value" v-if="martial_status === 'M' && spsIncome === 0 && slfIncome !== 0" v-bind:class="{ less: STCOut2[32] - STCOut1[32] < 0 }">
                <span class="big_save">{{ ('' + (STCOut2[30] - STCOut1[30])).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</span>元
            </p>
            <p class="diff_value" v-if="martial_status === 'M' && slfIncome === 0 && spsIncome !== 0" v-bind:class="{ less: STCOut2[32] - STCOut1[32] < 0 }">
                <span class="big_save">{{ ('' + (STCOut2[31] - STCOut1[31])).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</span>元
            </p>
            <p class="diff_value" v-if="martial_status === 'M' && !only_one_income" v-bind:class="{ less: STCOut2[32] - STCOut1[32] < 0 }">
                <span class="big_save">{{ ('' + (min_saved)).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</span>元
            </p>
        </div>
        -->
<!-- 2023onday -->
        <modal name="new_budget" height="auto" :scrollable="true" :adaptive="true" :maxWidth="420">
            <h3>23/24 （本課稅年度）</h3>
            <p class="nb_pay" v-if="martial_status !== 'M'">你原要交：
                <span class="pay_amt">{{ ('' + STCOut1[30]).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}元</span>
            </p>
            <p class="nb_pay" v-if="martial_status === 'M' && spsIncome === 0 && slfIncome === 0">你原要交：
                <span class="pay_amt">0元</span>
            </p>
            <p class="nb_pay" v-if="martial_status === 'M' && spsIncome === 0 && slfIncome !== 0">你原要交：
                <span class="pay_amt">{{ ('' + STCOut1[30]).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}元</span>
            </p>
            <p class="nb_pay" v-if="martial_status === 'M' && slfIncome === 0 && spsIncome !== 0">你原要交：
                <span class="pay_amt">{{ ('' + STCOut1[31]).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}元</span>
            </p>
            <p class="nb_pay" v-if="martial_status === 'M' && !only_one_income && STCOut1[32] < STCOut1[33]">你原要交：
                <span class="pay_amt">{{ ('' + STCOut1[32]).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}元</span>（分開評稅）
            </p>
            <p class="nb_pay" v-if="martial_status === 'M' && !only_one_income && STCOut1[32] >= STCOut1[33]">你原要交：
                <span class="pay_amt">{{ ('' + STCOut1[33]).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}元</span>（合併評稅）
            </p>
            <!-- onday2023 -->
            <p class="nb_save a1" v-if="martial_status !== 'M'" v-bind:class="{ less: STCOut2[30] - STCOut1[30] < 0 }">
                <span>獲退稅<sup>*</sup>： <span class="rebate_quota">({{ ((STCOut1[30]) * 1.00 > 3000 ? 3000 : (STCOut1[30]) * 1.00).toFixed(0).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}元)</span></span>
            </p>
            <p class="nb_save a2" v-if="martial_status === 'M' && spsIncome === 0 && slfIncome === 0" v-bind:class="{ }">
                <span>獲退稅<sup>*</sup>： <span class="rebate_quota">{{ 0 }}元</span></span>
            </p>
            <p class="nb_save a3" v-if="martial_status === 'M' && spsIncome === 0 && slfIncome !== 0" v-bind:class="{ }">
                <span>獲退稅<sup>*</sup>： <span class="rebate_quota">({{ ((STCOut1[30]) * 1.00 > 3000 ? 3000 : (STCOut1[30]) * 1.00).toFixed(0).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}元)</span></span>
            </p>
            <p class="nb_save a4" v-if="martial_status === 'M' && slfIncome === 0 && spsIncome !== 0" v-bind:class="{  }">
                <span>獲退稅<sup>*</sup>： <span class="rebate_quota">({{ ((STCOut1[31]) * 1.00 > 3000 ? 3000 : (STCOut1[31]) * 1.00).toFixed(0).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}元)</span></span>
            </p>
            <p class="nb_save a5" v-if="martial_status === 'M' && !only_one_income" v-bind:class="{ less: STCOut2[32] - STCOut1[32] < 0 }">
                <span>獲退稅<sup>*</sup>： <span class="rebate_quota">({{ ((last_pay) * 1.00 > 3000 ? 3000 : (last_pay) * 1.00).toFixed(0).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}元)</span></span>
            </p>

            <p class="nb_result a1" v-if="martial_status !== 'M'" v-bind:class="{ less: STCOut2[30] - STCOut1[30] < 0 }">
                <span>實際應繳： <span class="rebate_result">{{ (STCOut1[30] - 0.4 - ((STCOut1[30]) * 1.00 > 3000 ? 3000 : (STCOut1[30]) * 1.00)).toFixed(0).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}元</span></span>
            </p>
            <p class="nb_result a2" v-if="martial_status === 'M' && spsIncome === 0 && slfIncome === 0" v-bind:class="{ }">
                <span>實際應繳： <span class="rebate_result">{{ 0 }}元</span></span>
            </p>
            <p class="nb_result a3" v-if="martial_status === 'M' && spsIncome === 0 && slfIncome !== 0" v-bind:class="{ }">
                <span>實際應繳： <span class="rebate_result">{{ (STCOut1[30] - 0.4 - ((STCOut1[30]) * 1.00 > 3000 ? 3000 : (STCOut1[30]) * 1.00)).toFixed(0).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}元</span></span>
            </p>
            <p class="nb_result a4" v-if="martial_status === 'M' && slfIncome === 0 && spsIncome !== 0" v-bind:class="{  }">
                <span>實際應繳： <span class="rebate_result">{{ (STCOut1[31] - 0.4 - ((STCOut1[31]) * 1.00 > 3000 ? 3000 : (STCOut1[31]) * 1.00)).toFixed(0).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}元</span></span>
            </p>
            <p class="nb_result a5" v-if="martial_status === 'M' && !only_one_income" v-bind:class="{ less: STCOut2[32] - STCOut1[32] < 0 }">
                <span>實際應繳： <span class="rebate_result">{{ (last_pay - 0.4 - ((last_pay) * 1.00 > 3000 ? 3000 : (last_pay) * 1.00)).toFixed(0).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}元</span></span>
            </p>
            <p><small>*退稅尚待有關法例通過</small></p>

            <h3>24/25 （下個課稅年度）</h3>
            <p class="nb_pay" v-if="martial_status !== 'M'">預計你要交<sup>#</sup>：
                <span class="pay_amt">{{ ('' + STCOut2[30]).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}元</span>
            </p>
            <p class="nb_pay" v-if="martial_status === 'M' && spsIncome === 0 && slfIncome === 0">預計你要交<sup>#</sup>：
                <span class="pay_amt">0元</span>
            </p>
            <p class="nb_pay" v-if="martial_status === 'M' && spsIncome === 0 && slfIncome !== 0">預計你要交<sup>#</sup>：
                <span class="pay_amt">{{ ('' + STCOut2[30]).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}元</span>
            </p>
            <p class="nb_pay" v-if="martial_status === 'M' && slfIncome === 0 && spsIncome !== 0">預計你要交<sup>#</sup>：
                <span class="pay_amt">{{ ('' + STCOut2[31]).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}元</span>
            </p>
            <p class="nb_pay" v-if="martial_status === 'M' && !only_one_income && STCOut2[32] < STCOut2[33]">預計你要交<sup>#</sup>：
                <span class="pay_amt">{{ ('' + STCOut2[32]).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}元</span>（分開評稅）
            </p>
            <p class="nb_pay" v-if="martial_status === 'M' && !only_one_income && STCOut2[32] >= STCOut2[33]">預計你要交<sup>#</sup>：
                <span class="pay_amt">{{ ('' + STCOut2[33]).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}元</span>（合併評稅）
            </p>

            <p class="nb_save a1" v-if="false" v-bind:class="{ less: STCOut2[30] - STCOut1[30] < 0 }">
                <small>（較23/24年度少交） <span class="save_amt">{{ ('' + (STCOut2[30] - STCOut1[30])).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}元</span>
                <!-- <a class="toggle_changes" href="javascript:void()" v-on:click.prevent="toggleClass('show_changes')">詳情  ▼</a><br> -->
                </small>
            </p>
            <p class="nb_save a2" v-if="false" v-bind:class="{ }">
                <small>（較23/24年度少交） <span class="save_amt">0元</span>
                <!-- <a class="toggle_changes" href="javascript:void()" v-on:click.prevent="toggleClass('show_changes')">詳情  ▼</a><br> -->
                </small>
            </p>
            <p class="nb_save a3" v-if="false">
                <small>（較23/24年度少交） <span class="save_amt">{{ ('' + (STCOut2[30] - STCOut1[30])).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}元（分開評稅）</span>
                <!-- <a class="toggle_changes" href="javascript:void()" v-on:click.prevent="toggleClass('show_changes')">詳情  ▼</a><br> -->
                </small>
            </p>
            <p class="nb_save a4" v-if="false">
                <small>（較23/24年度少交） <span class="save_amt">{{ ('' + (STCOut2[31] - STCOut1[31])).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}元（分開評稅）</span>
                <!-- <a class="toggle_changes" href="javascript:void()" v-on:click.prevent="toggleClass('show_changes')">詳情  ▼</a><br> -->
                </small>
            </p>
            <p class="nb_save a5" v-if="false">
                <small>（較23/24年度少交） <span class="save_amt">{{ ('' + (min_saved)).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}元</span>
                <!-- <a class="toggle_changes" href="javascript:void()" v-on:click.prevent="toggleClass('show_changes')">詳情  ▼</a><br> -->
                </small>
            </p>

            <p><small>#根據23/24年度資料、2023年施政報告相關稅務措施，以及24/25財政預算案公布措施推算</small></p>


            <div v-if="false" class="tax_changes">
                <table class="new_budget" cellspacing="0" cellpadding="0" dir="ltr" border="0">
                    <tbody>
                        <tr>
                            <td width="*">一齊睇睇慳咗喺邊：</td>
                            <td width="20%">23/24年度</td>
                            <td width="16">&nbsp;</td>
                            <td width="20%">24/25年度</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td>（港元）</td>
                            <td>&nbsp;</td>
                            <td>（港元）</td>
                        </tr>
                        <tr>
                            <td>邊際稅階</td>
                            <td>$50,000</td>
                            <td>→</td>
                            <td>$50,000</td>
                        </tr>
                        <tr>
                            <td>邊際稅率</td>
                            <td>2%、6%、10%、14%、17%</td>
                            <td>&nbsp;</td>
                            <td>2%、6%、10%、14%、17%</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>傷殘人士免稅額</td>
                            <td>$75,000</td>
                            <td>&nbsp;</td>
                            <td>$75,000</td>
                        </tr>
                        <tr v-if="false">
                            <td>醫療保險開支扣稅</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>每人上限$8,000</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>供養60歲或以上的直系長輩免稅額</td>
                            <td>$50,000</td>
                            <td>→</td>
                            <td>$50,000</td>
                        </tr>
                        <tr>
                            <td>供養55至59歲的直系長輩免稅額</td>
                            <td>$25,000</td>
                            <td>→</td>
                            <td>$25,000</td>
                        </tr>
                        <tr>
                            <td>子女基本及額外免稅額</td>
                            <td>$120,000</td>
                            <td>→</td>
                            <td>$120,000</td>
                        </tr>
                        <tr>
                            <td>長者住宿照顧開支</td>
                            <td>$100,000</td>
                            <td>→</td>
                            <td>$100,000</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </modal>

    </div>

    </div>
</template>

<script>
import * as aliasTaxNewYear from './Tax2024_data'
export default aliasTaxNewYear
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
