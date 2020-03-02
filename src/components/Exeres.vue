<template>
  <v-card flat tile>
    <v-toolbar>
      <v-btn icon class="hidden-xs-only" @click="goHome">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-toolbar-title>Title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon class="hidden-xs-only">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>

    <v-card-actions class="justify-space-between">
      <v-btn text v-on:click="onboarding--" :disabled="onboarding === 0">上一题</v-btn>
      <v-item-group v-model="onboarding" class="text-center" mandatory>
        <v-item v-for="n in exerCount" :key="`btn-${n}`" v-slot:default="{ active, toggle }">
          <v-btn :input-value="active" icon v-on:click="toggle">
            <v-icon>mdi-record</v-icon>
          </v-btn>
        </v-item>
      </v-item-group>
      <v-btn text v-on:click="onboarding++" :disabled="onboarding === exerCount-1">下一题</v-btn>
    </v-card-actions>

    <v-window v-model="onboarding" id="exeresWindow">
      <v-window-item v-for="(exer,exerIndex) in exeres" :key="exerIndex">
        {{typeNames[exer.typeId-1].name}},{{onboarding+1}}/{{exerCount}}
        <v-card style="padding:20px">
          <div v-html="exer.exer"></div>
          <v-radio-group v-if="exer.typeId==1" v-model="answers[exerIndex].answer">
            <v-radio
              v-for="(option,optionIndex) in exer.options"
              :key="optionIndex"
              :value="optionIndex"
            >
              <template v-slot:label>
                <div v-html="option"></div>
              </template>
            </v-radio>
          </v-radio-group>

          <v-checkbox
            v-else-if="exer.typeId==6"
            v-for="(option,optionIndex) in exer.options"
            :key="optionIndex"
            v-model="answers[exerIndex].answer"
            type="checkbox"
            :value="optionIndex"
            name="exerIndex"
          >
            <template v-slot:label>
              <template v-html="option"></template>
            </template>
          </v-checkbox>
          <v-text-field
            v-else-if="exer.typeId==2"
            label="我的答案"
            outlined
            v-model="answers[exerIndex].answer"
          ></v-text-field>
          <v-textarea v-else label="我的答案" auto-grow outlined v-model="answers[exerIndex].answer"></v-textarea>
        </v-card>
      </v-window-item>
    </v-window>
    <p>我的选项是:{{answers}},,,,,,,当前题目：{{onboarding}}</p>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "Exeres",
  data() {
    return {
      onboarding: 0,
      exerCount: 0,
      answers: [],
      exeres: {},
      typeNames: [
        { id: 1, name: "单选题" },
        { id: 2, name: "填空题" },
        { id: 3, name: "实验题" },
        { id: 4, name: "辨析题" },
        { id: 5, name: "计算题" },
        { id: 6, name: "多选题" },
        { id: 7, name: "作图题" },
        { id: 8, name: "简答题" }
      ]
    };
  },
  created: function() {
    this.loadExeres(0);
  },
  methods: {
    loadExeres: function(id) {
      axios.get("./static/data.json").then(response => {
        this.exerCount = response.data.length;
        // 先清空answers组
        this.answers.length = 0;
        for (var i = 0; i < this.exerCount; i++) {
          // 将题目集合放置于result的answers对象中
          var Exer = response.data[i];

          var main = Exer.exer;

          this.answers.push({ exerId: Exer.exerId, answer: "" });

          // 若是单选题或复选题，则提取选项
          if (Exer.typeId == 1 || Exer.typeId == 6) {
            var start = main.indexOf("<p>（A）"); //获得字符串的开始位置
            // 获取题干
            response.data[i].exer = main.substr(0, start);
            // 将选项分组
            var stemExcluded = main.substr(start);
            var options = stemExcluded.match(/<p>.+?<\/p>/g);
            for (var j = 0; j < options.length; j++) {
              options[j] = options[j].replace("<p>", "");
              options[j] = options[j].replace("</p>", "");
            }
            response.data[i].options = options;
          }
        }
        this.exeres = response.data;
        console.log(this.exeres);
      });
    },
    goHome: function() {
      this.$router.go(-1);
    }
  }
};
</script>
