import { defineComponent } from "vue";
import { Emoji } from "emoji-mart-vue";

const re = /(:.+?:)/g;

export default defineComponent({
  props: {
    messageText: {
      type: String,
    },
  },
  render(h) {
    return (
      <p>
        {this.messageText.split(re).map((item, i) => {
          if (item.match(re)) {
            return <Emoji key={i} emoji={item} set="apple" size={16} />;
          } else {
            return item;
          }
        })}
      </p>
    );
  },
});
