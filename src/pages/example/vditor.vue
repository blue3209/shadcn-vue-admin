<template>
  <BasicPage title="Vditor 编辑器" description="功能强大的 Markdown 编辑器，支持主题和语言自动切换" class="h-full">
    <div class="h-full">
      <VditorEditor 
        ref="vditorEditorRef" 
        v-model="content" 
        :mode="editorMode" 
        :height="'100%'" 
        :cache="true"
        :cache-id="'vditor-example'" 
        :upload="true" 
        :toolbar="true" 
        :counter="true" 
        :outline="true"
        :typewriter-mode="false" 
        :auto-theme="true" 
        @ready="handleReady" 
        @input="handleInput" 
        @focus="handleFocus"
        @blur="handleBlur" 
        @select="handleSelect" 
        @esc="handleEsc" 
        @ctrl-enter="handleCtrlEnter" 
      />
    </div>
  </BasicPage>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BasicPage from '@/components/global-layout/basic-page.vue'
import VditorEditor from '@/components/vditor-editor/VditorEditor.vue'

// 默认内容
const defaultContent = `Vditor 是一款**所见即所得**编辑器，支持 *Markdown*。

* 不熟悉 Markdown 可使用工具栏或快捷键进行排版
* 熟悉 Markdown 可直接排版，也可切换为分屏预览

更多细节和用法请参考 [Vditor - 浏览器端的 Markdown 编辑器](https://ld246.com/article/1549638745630)，同时也欢迎向我们提出建议或报告问题，谢谢 ❤️

## 教程

这是一篇讲解如何正确使用 **Markdown** 的排版示例，学会这个很有必要，能让你的文章有更佳清晰的排版。

> 引用文本：Markdown is a text formatting syntax inspired

## 语法指导

### 普通内容

这段内容展示了在内容里面一些排版格式，比如：

- **加粗** - \`**加粗**\`
- *倾斜* - \`*倾斜*\`
- ~~删除线~~ - \`~~删除线~~\`
- \`Code 标记\` - \`\` \`Code 标记\` \`\`
- [超级链接](https://ld246.com) - \`[超级链接](https://ld246.com)\`
- [username@gmail.com](mailto:username@gmail.com) - \`[username@gmail.com](mailto:username@gmail.com)\`

### 表情符号 Emoji

支持大部分标准的表情符号，可使用输入法直接输入，也可手动输入字符格式。通过输入 \`:\` 触发自动完成，可在个人设置中[设置常用表情](https://ld246.com/settings/function)。

#### 一些表情例子

😄 😆 😵 😭 😰 😅  😢 😤 😍 😌
👍 👎 💯 👏 🔔 🎁 ❓ 💣 ❤️ ☕️ 🌀 🙇 💋 🙏 💢

### 代码块

#### 语法高亮支持

如果在 \`\`\` 后面跟随语言名称，可以有语法高亮的效果哦，比如:

##### 演示 Go 代码高亮

\`\`\`go
package main

import "fmt"

func main() {
	fmt.Println("Hello, 世界")
}
\`\`\`

##### 演示 Java 高亮

\`\`\`java
public class HelloWorld {

    public static void main(String[] args) {
        System.out.println("Hello World!");
    }

}
\`\`\`

### 有序、无序、任务列表

#### 无序列表

- Java
  - Spring
    - IoC
    - AOP
- Go
  - gofmt
  - Wide
- Node.js
  - Koa
  - Express

#### 有序列表

1. Node.js
   1. Express
   2. Koa
   3. Sails
2. Go
   1. gofmt
   2. Wide
3. Java
   1. Latke
   2. IDEA


#### 任务列表

- [x] 发布 Sym
- [x] 发布 Solo
- [ ] 预约牙医



### 表格

如果需要展示数据什么的，可以选择使用表格。

| header 1 | header 2 |
| -------- | -------- |
| cell 1   | cell 2   |
| cell 3   | cell 4   |
| cell 5   | cell 6   |

### 数学公式

多行公式块：

$$
\\frac{1}{
  \\Bigl(\\sqrt{\\phi \\sqrt{5}}-\\phi\\Bigr) e^{
  \\frac25 \\pi}} = 1+\\frac{e^{-2\\pi}} {1+\\frac{e^{-4\\pi}} {
    1+\\frac{e^{-6\\pi}}
    {1+\\frac{e^{-8\\pi}}{1+\\cdots}}
  }
}
$$

行内公式：

公式 $a^2 + b^2 = \\color{red}c^2$ 是行内。

### 脑图

\`\`\`mindmap
- 教程
- 语法指导
  - 普通内容
  - 表情符号 Emoji
  - 代码块
  - 有序、无序、任务列表
  - 表格
  - 数学公式
  - 脑图
  - 流程图
  - 时序图
  - 甘特图
  - 图表
  - 五线谱
  - Graphviz
  - 多媒体
  - 脚注
- 快捷键
\`\`\`

### 流程图

\`\`\`mermaid
graph TB
    c1-->a2
    subgraph one
    a1-->a2
    end
    subgraph two
    b1-->b2
    end
    subgraph three
    c1-->c2
    end
\`\`\`

### 时序图

\`\`\`mermaid
sequenceDiagram
    Alice->>John: Hello John, how are you?
    loop Every minute
        John-->>Alice: Great!
    end
\`\`\`

### 甘特图

\`\`\`mermaid
gantt
    title A Gantt Diagram
    dateFormat  YYYY-MM-DD
    section Section
    A task           :a1, 2019-01-01, 30d
    Another task     :after a1  , 20d
    section Another
    Task in sec      :2019-01-12  , 12d
    another task      : 24d
\`\`\`

### 图表

\`\`\`echarts
{
  "title": { "text": "最近 30 天" },
  "tooltip": { "trigger": "axis", "axisPointer": { "lineStyle": { "width": 0 } } },
  "legend": { "data": ["帖子", "用户", "回帖"] },
  "xAxis": [{
      "type": "category",
      "boundaryGap": false,
      "data": ["2019-05-08","2019-05-09","2019-05-10","2019-05-11","2019-05-12","2019-05-13","2019-05-14","2019-05-15","2019-05-16","2019-05-17","2019-05-18","2019-05-19","2019-05-20","2019-05-21","2019-05-22","2019-05-23","2019-05-24","2019-05-25","2019-05-26","2019-05-27","2019-05-28","2019-05-29","2019-05-30","2019-05-31","2019-06-01","2019-06-02","2019-06-03","2019-06-04","2019-06-05","2019-06-06","2019-06-07"],
      "axisTick": { "show": false },
      "axisLine": { "show": false }
  }],
  "yAxis": [{ "type": "value", "axisTick": { "show": false }, "axisLine": { "show": false }, "splitLine": { "lineStyle": { "color": "rgba(0, 0, 0, .38)", "type": "dashed" } } }],
  "series": [
    {
      "name": "帖子", "type": "line", "smooth": true, "itemStyle": { "color": "#d23f31" }, "areaStyle": { "normal": {} }, "z": 3,
      "data": ["18","14","22","9","7","18","10","12","13","16","6","9","15","15","12","15","8","14","9","10","29","22","14","22","9","10","15","9","9","15","0"]
    },
    {
      "name": "用户", "type": "line", "smooth": true, "itemStyle": { "color": "#f1e05a" }, "areaStyle": { "normal": {} }, "z": 2,
      "data": ["31","33","30","23","16","29","23","37","41","29","16","13","39","23","38","136","89","35","22","50","57","47","36","59","14","23","46","44","51","43","0"]
    },
    {
      "name": "回帖", "type": "line", "smooth": true, "itemStyle": { "color": "#4285f4" }, "areaStyle": { "normal": {} }, "z": 1,
      "data": ["35","42","73","15","43","58","55","35","46","87","36","15","44","76","130","73","50","20","21","54","48","73","60","89","26","27","70","63","55","37","0"]
    }
  ]
}
\`\`\`

### 五线谱

\`\`\`abc
X: 24
T: Clouds Thicken
C: Paul Rosen
S: Copyright 2005, Paul Rosen
M: 6/8
L: 1/8
Q: 3/8=116
R: Creepy Jig
K: Em
|:"Em"EEE E2G|"C7"_B2A G2F|"Em"EEE E2G|\\
"C7"_B2A "B7"=B3|"Em"EEE E2G|
"C7"_B2A G2F|"Em"GFE "D (Bm7)"F2D|\\
1"Em"E3-E3:|2"Em"E3-E2B|:"Em"e2e gfe|
"G"g2ab3|"Em"gfeg2e|"D"fedB2A|"Em"e2e gfe|\\
"G"g2ab3|"Em"gfe"D"f2d|"Em"e3-e3:|
\`\`\`

### Graphviz

\`\`\`graphviz
digraph finite_state_machine {
    rankdir=LR;
    size="8,5"
    node [shape = doublecircle]; S;
    node [shape = point ]; qi

    node [shape = circle];
    qi -> S;
    S  -> q1 [ label = "a" ];
    S  -> S  [ label = "a" ];
    q1 -> S  [ label = "a" ];
    q1 -> q2 [ label = "ddb" ];
    q2 -> q1 [ label = "b" ];
    q2 -> q2 [ label = "b" ];
}
\`\`\`

### Flowchart

\`\`\`flowchart
st=>start: Start
op=>operation: Your Operation
cond=>condition: Yes or No?
e=>end

st->op->cond
cond(yes)->e
cond(no)->op
\`\`\`

### 多媒体

支持 v.qq.com，youtube.com，youku.com，coub.com，facebook.com/video，dailymotion.com，.mp4，.m4v，.ogg，.ogv，.webm，.mp3，.wav 链接解析

### 图片示例

![图片](https://blue3209.github.io/shadcn-vue-admin/placeholder.png)

### 视频示例

腾讯视频：
https://v.qq.com/x/cover/zf2z0xpqcculhcz/y0016tj0qvh.html

YouTube 视频（示例）：
https://www.youtube.com/watch?v=dQw4w9WgXcQ

#### 音频示例
MP3 音频（示例）：
https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3

#### 直接视频文件（示例）
MP4 视频：
https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4

<video width="320" height="240" controls>
    <source src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" type="video/mp4">
</video>


### 脚注

这里是一个脚注引用[^1]，这里是另一个脚注引用[^bignote]。

[^1]: 第一个脚注定义。

[^bignote]: 脚注定义可使用多段内容。

    缩进对齐的段落包含在这个脚注定义内。

    \`\`\`
    可以使用代码块。
    \`\`\`

    还有其他行级排版语法，比如**加粗**和[链接](https://b3log.org)。

## 快捷键

我们的编辑器支持很多快捷键，具体请参考 [键盘快捷键](https://ld246.com/article/1474030007391)（或者按 "\`?\`" 😼）`

// 组件状态
const vditorEditorRef = ref<InstanceType<typeof VditorEditor>>()
const content = ref(defaultContent)
const editorMode = ref<'wysiwyg' | 'ir' | 'sv'>('ir')
const isReady = ref(false)

// 事件处理函数
const handleReady = () => {
  isReady.value = true
  console.log('✅ Vditor 编辑器初始化完成')
  console.log('🌍 当前语言:', vditorEditorRef.value?.vditorLang)
  console.log('🎨 当前主题:', vditorEditorRef.value?.finalTheme)
}

const handleInput = (value: string) => {
  console.log('📝 内容输入:', value.length, '个字符')
}

const handleFocus = (_value: string) => {
  console.log('🎯 编辑器获得焦点')
}

const handleBlur = (_value: string) => {
  console.log('😴 编辑器失去焦点')
}

const handleSelect = (value: string) => {
  console.log('🎯 选中文本:', value)
}

const handleEsc = (_value: string) => {
  console.log('⌨️ ESC 按键')
}

const handleCtrlEnter = (_value: string) => {
  console.log('⌨️ Ctrl+Enter 按键')
}
</script>

<style scoped>
/* 确保编辑器完全填充容器 */
:deep(.vditor) {
  height: 100% !important;
}

:deep(.vditor-content) {
  height: calc(100% - 40px) !important;
}
</style>