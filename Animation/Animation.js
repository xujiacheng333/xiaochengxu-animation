
// set 对象有
// {
//   className,
//   animationName,
//   delayTime,
// }

// 单元素动画
class Animation {
  constructor(that,set) {
    this.that = that;
    this.datas = set.datas;
    this.className = set.className;
    this.animationName = set.animationName;
    this.delayTime = set.delayTime ? set.delayTime : 0;
    this.timeOut = set.timeOut;
    this.threshold = false; // 阈值 当此值为真时，动画在运行；
  }

  in (delayTime) {  
      return this.singleIn(delayTime)
  }

  // 单元素进入动画
  singleIn(delayTime) {
    if (this.threshold) return false;
    let Delay_Time = delayTime ? delayTime : this.delayTime
    return new Promise((resolve, reject)=>{
      this.threshold = true;
      setTimeout(()=>{
        this.enter().then(()=>{
          resolve()
          setTimeout(()=>{
            this.entered().then(()=>{
              setTimeout(()=>{
                this.remove()
              },this.timeOut)
            })
          },100)
        })
      },Delay_Time)
    }) 
  }

  out (delayTime) {
    return this.singleOut(delayTime)
  }
  // 单元素离开动画
  singleOut (delayTime) {
    if (this.threshold) return false;
    let Delay_Time = delayTime ? delayTime : this.delayTime
    return new Promise((resolve, reject)=>{
      this.threshold = true;
      setTimeout(()=>{
        this.exit().then(()=>{
          setTimeout(()=>{
            this.exited().then(()=>{
              setTimeout(()=>{
                this.remove()
                resolve()
              },this.timeOut)
            })
          },100)
        })
      },Delay_Time)
    }) 
  }

  enter () {
    return new Promise((resolve, reject) =>{
      let datas = {}
      datas[`${this.animationName}`] = `${this.className}-enter`
      this.that.setData(datas)
      resolve()
    })
  }

  entered () {
    return new Promise ((resolve, reject) => {
      let datas = {}
      datas[`${this.animationName}`] = `${this.className}-enter ${this.className}-enter-active`
      this.that.setData(datas)
      resolve()
    })

  }

  remove() {
    let datas = {}
    datas[`${this.animationName}`] = ``
    this.that.setData(datas)
    this.threshold = false;
  }


  exit () {
    return new Promise((resolve, reject) =>{
      let datas = {}
      datas[`${this.animationName}`] = `${this.className}-exit`
      this.that.setData(datas)
      resolve()
    })
  }

  exited () {
    return new Promise ((resolve, reject) => {
      let datas = {}
      datas[`${this.animationName}`] = `${this.className}-exit ${this.className}-exit-active`
      this.that.setData(datas)
      resolve()
    })

  }

} 

// 组动画
class AnimationGroup {
  constructor(that,set) {
    this.that = that;
    this.className = set.className;
    this.animationName = set.animationName;
    this.timeOut = set.timeOut;
    this.delayTime = set.delayTime;
    this.interval = set.interval;
    this.threshold = false;
    // this.datas = that.data[`${set.animationName}`];
    this.init()
  }

  init () {
    // 设置class数组
    let outputData = {}
    outputData[`${this.animationName}Class`] = []
    this.that.setData(outputData)


  }

  in (delayTime) { 
    if (this.threshold) return false;
    let length = this.that.data[`${this.animationName}`].length;
    let Delay_Time = delayTime ? delayTime : this.delayTime;
    return new Promise((resolve, reject)=>{
      this.threshold = true;
      setTimeout(()=>{
        for (let i = 0 ; i < length ; i++) {
          setTimeout(()=>{
            this.enter(i).then(()=>{
              resolve()
              setTimeout(()=>{
                this.entered(i).then(()=>{
                  setTimeout(()=>{
                    this.remove(i)
                  },this.timeOut)
                })
              },100)
            })
          }, this.interval * i)
          
        }
        
      },Delay_Time)
    }) 
  }

  out (delayTime) {
    if (this.threshold) return false;
      let length = this.that.data[`${this.animationName}`].length;
      let Delay_Time = delayTime ? delayTime : this.delayTime;
      return new Promise((resolve, reject)=>{
        this.threshold = true;
        setTimeout(()=>{
          for (let i = 0 ; i < length ; i++) {
            setTimeout(()=>{
              this.exit(i).then(()=>{
                setTimeout(()=>{
                  this.exited(i).then(()=>{
                    setTimeout(()=>{
                      this.remove(i)
                      resolve()
                    },this.timeOut)
                  })
                },100)
              })
            }, this.interval * i)
            
          }
          
        },Delay_Time)
      }) 
  }

  enter (index) {
    console.log("运行enter,index =   " + index)
    // console.log(this.that.data[`${this.animationName}Class`])
    return new Promise((resolve, reject) =>{
      let datas = this.that.data
      datas[`${this.animationName}Class`][index] = `${this.className}-enter`
      this.that.setData(datas)
      resolve()
    })
  }

  entered (index) {
    console.log("运行entered,index =   " + index)
    return new Promise ((resolve, reject) => {
      let datas = this.that.data
      datas[`${this.animationName}Class`][index] = `${this.className}-enter ${this.className}-enter-active`
      this.that.setData(datas)
      resolve()
    })

  }

  remove(index) {
    let datas = this.that.data
    let length = this.that.data[`${this.animationName}`].length;
    datas[`${this.animationName}Class`][index] = ``
    this.that.setData(datas)
    if (index >= length - 1) {
      this.threshold = false;
    }
  }



  exit (index) {
    console.log("运行exit,index =   " + index)
    return new Promise((resolve, reject) =>{
      let datas = this.that.data
      datas[`${this.animationName}Class`][index] = `${this.className}-exit`
      this.that.setData(datas)
      resolve()
    })
  }

  exited (index) {
    console.log("运行exited,index =   " + index)
    return new Promise ((resolve, reject) => {
      let datas = this.that.data
      datas[`${this.animationName}Class`][index] = `${this.className}-exit ${this.className}-exit-active`
      this.that.setData(datas)
      resolve()
    })

  }

}

// 组内指定元素动画
class AnimationAssign {
  constructor(that,set) {
    this.that = that;
    this.className = set.className;
    this.animationName = set.animationName;
    this.timeOut = set.timeOut;
    // this.delayTime = set.delayTime;
    // this.interval = set.interval;
    this.threshold = false;
    this.init()
  }

  init () {
    // 设置class数组
    let outputData = {}
    outputData[`${this.animationName}Assign`] = []
    this.that.setData(outputData)


  }

  in(index,delayTime) {
    this.index = parseInt(index);
    if (this.threshold) return false;
    let Delay_Time = delayTime ? delayTime : this.delayTime
    return new Promise((resolve, reject)=>{
      this.threshold = true;
      setTimeout(()=>{
        this.enter().then(()=>{
          resolve()
          setTimeout(()=>{
            this.entered().then(()=>{
              setTimeout(()=>{
                this.remove()
              },this.timeOut)
            })
          },100)
        })
      },Delay_Time)
    }) 
  }

  out (index,delayTime) {
    this.index = parseInt(index);
    if (this.threshold) return false;
    let Delay_Time = delayTime ? delayTime : this.delayTime
    return new Promise((resolve, reject)=>{
      this.threshold = true;
      setTimeout(()=>{
        this.exit().then(()=>{
          setTimeout(()=>{
            this.exited().then(()=>{
              setTimeout(()=>{
                this.remove()
                resolve()
              },this.timeOut)
            })
          },100)
        })
      },Delay_Time)
    }) 
  }

  enter() {
    console.log("运行到enter")
    console.log(this.index)
    return new Promise((resolve, reject) =>{
      let datas = this.that.data;
      datas[`${this.animationName}Assign`][this.index] = `${this.className}-enter`
      this.that.setData(datas)
      resolve()
    })
  }

  entered () {
    return new Promise ((resolve, reject) => {
      let datas = this.that.data;
       datas[`${this.animationName}Assign`][this.index] = `${this.className}-enter ${this.className}-enter-active`
      this.that.setData(datas)
      resolve()
    })

  }

  remove() {
    let datas = this.that.data;
    datas[`${this.animationName}Assign`][this.index] = ``
    this.that.setData(datas)
    this.threshold = false;
  }


  exit () {
    return new Promise((resolve, reject) =>{
      let datas = this.that.data;
      datas[`${this.animationName}Assign`][this.index] = `${this.className}-exit`
      this.that.setData(datas)
      resolve()
    })
  }

  exited () {
    return new Promise ((resolve, reject) => {
      let datas = this.that.data;
      datas[`${this.animationName}Assign`][this.index] = `${this.className}-exit ${this.className}-exit-active`
      this.that.setData(datas)
      resolve()
    })

  }
}



export {Animation, AnimationGroup, AnimationAssign};








