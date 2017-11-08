# xiaochengxu-animation
小程序动画插件，更方便地将所需的动画css注入到对应的元素中，使动画逻辑更可控




# 动画类型：
* Animation  单元素动画  只控制一个元素
* AnimationGroup 多元素 延迟，动画
* AnimationAssign 指定多元素中其中一个元素动画

# 导入
```
import {Animation, AnimationGroup, AnimationAssign} from '../../Animation/Animation';
```

# wxml 中添加

```
    //Animation
    <view wx:if="{{boxShow}}" class="box {{fade}}"></view>

    //AnimationGroup
    <block wx:for="{{fadeArr}}">
      <view class="{{fadeArrClass[index]}}">{{item}}</view>
    </block>

    // AnimationAssign
    <block wx:for="{{fadeArr}}">
      <view  class="{{fadeArrAssign[index]}}" data-index="{{index}}" bindtap="removeIt">{{item}}</view>
    </block>
```

# css 中添加
```
    .fadeOutToButton-enter{
      opacity: 0.01;
      transform: translateY(-50%);
    }

    .fadeOutToButton-enter.fadeOutToButton-enter-active{
      opacity: 1;
      transform: translateY(0);
      transition: all 1000ms ease-in;
    }


    .fadeOutToButton-exit{
      opacity: 1;
      transform: translateY(0);
    }

    .fadeOutToButton-exit.fadeOutToButton-exit-active{
      opacity: 0.01;
      transform: translateY(50%);
      transition: all 1000ms ease-in;
    }
```

# 初始化  在onLoad 函数中：

```
  onLoad:function(options){


    //Animation
    this.fadeOutToButton =  new Animation(this,{
      className: 'fadeOutToButton', // 写在css的样式名
      animationName: 'fade',  // 填写在html中的变量名
      timeOut: 1000, //动画时间 和动画持续时间同步
      // delayTime: 1000,  // 延迟时间
    })

    //AnimationGroup
    this.fadeArr = new AnimationGroup(this,{
      className: 'fadeOutToButton', // 写在css的样式名
      animationName: 'fadeArr',  // 填写在html中的变量名
      timeOut: 1000, //动画时间 和动画持续时间同步
      // delayTime: 1000,  // 延迟时间
      interval: 200,
    })

    //AnimationAssign
    this.removeAnimation = new AnimationAssign(this,{
      className: 'fadeOutToButton',
      animationName: 'fadeArr',
      timeOut:1000,
    })


  },
```


# 调用 在 onShow 函数中:  （当元素一开始存在时）
```
    onShow: function () {
      this.fadeOutToButton.in()
    },

```

# 当元素开始并不存在  (会先显示元素之前先添加上 enter类)
```
    // 可传入延迟时间 毫秒 不填会根据构造时的延迟时间来控制
    this.fadeOutToButton.in(1000).then(()=>{
      this.setData({
        boxShow: true,
      })
    })
```


# 消除元素 (会先元素消失之后在消失元素)
```
    this.fadeOutToButton.out().then(()=>{
      this.setData({
        boxShow: false,
      })
    })
```




