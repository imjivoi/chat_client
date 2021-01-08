import { defineComponent } from "vue";//@ts-ignore
import { Emoji } from "emoji-mart-vue";

const re = /(:.+?:)/g;

export default defineComponent({
  props: {
    messageText: {
      type: String,
    },
  },
  render() {
    return (
      <p>
        {this.messageText?.split(re).map((item, i) => {
          
          if (item.match(re)) {
            console.log(item);
            return <Emoji key={i} emoji={item} set="apple" size={16} />;
          } else {
            return item;
          }
        })}
      </p>
    );
  },
});
