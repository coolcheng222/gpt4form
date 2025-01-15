<template>
  <div v-html="htmlContent">

  </div>
</template>

<script>
import MarkdownIt from 'markdown-it'

export default {
  data() {
    return {
      md: new MarkdownIt(),
      markdown: `\`\`\`python \n print("hello world")\n\`\`\``
    }
  },
  computed: {
    htmlContent() {
      return this.md.render(this.markdown);
    }
  }
}
</script>