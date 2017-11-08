import {Animation , AnimationGroup, AnimationAssign} from '../../Animation/Animation';

Page({
  data:{
    boxShow: true,
    fadeArr: [1,2,3],
  },
  onLoad:function(options){

    // this.fadeOutToButton =  new Animation(this,{
    //   className: 'fadeOutToButton', // 写在css的样式名
    //   animationName: 'fade',  // 填写在html中的变量名
    //   timeOut: 1000, //动画时间 和动画持续时间同步
    //   // delayTime: 1000,  // 延迟时间
    // })

    this.fadeArr = new AnimationGroup(this,{
      className: 'fadeOutToButton', // 写在css的样式名
      animationName: 'fadeArr',  // 填写在html中的变量名
      timeOut: 1000, //动画时间 和动画持续时间同步
      // delayTime: 1000,  // 延迟时间
      interval: 200,
    })

    // this.removeAnimation = new AnimationAssign(this,{
    //   className: 'fadeOutToButton',
    //   animationName: 'fadeArr',
    //   timeOut:1000,
    // })

  },
  onShow: function () {
    this.fadeArr.in()
  },
  onReady: function () {
    console.log("onReady")

  },

  animation: function () {
    var that = this;
    // this.fadeOutToButton.in()

    // console.log(this.fadeArr.in())

    // this.fadeArr.in().then(()=>{
    //   this.setData({
    //     fadeArr: [1,2,4]
    //   })
    // })

    // // 可传入延迟时间 毫秒 不填会根据构造时的延迟时间来控制
    // this.fadeOutToButton.in(1000).then(()=>{
    //   this.setData({
    //     boxShow: true,
    //   })
    // })
  },

  animation2: function () {
    this.fadeArr.out().then(()=>{
      // this.setData({
      //   fadeArr: []
      // })
    })

    // this.fadeOutToButton.out().then(()=>{
    //   this.setData({
    //     boxShow: false,
    //   })
    // })
  },


  removeIt: function (eve) {
    console.log();
    let index = eve.currentTarget.dataset.index
    this.removeAnimation.out(index).then(()=>{
      let fadeArr = this.data.fadeArr;
      fadeArr.splice(index, 1 )
      this.setData({
        fadeArr:fadeArr,
      })
    });
  },


})    