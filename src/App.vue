<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import './assets/fonts/montserrat.css';
#app {
  font-family: "Montserrat";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body{
  font-family: "Montserrat";
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
*{
  font-family: "Montserrat";
  box-sizing: border-box;
}
.toggle-sidebar{
  width: 60px!important;
  transition: all .3s;
  img{
    transform: scale(0.7);
  }
}
.wrapper{
        display: flex;
    }
    #sidebar{
        width: 300px;
        padding: 10px;
        background: #fff;
        border-right: 1px solid #ccc;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        transition: all .3s;
        .dashboard-links{
          margin: 100px 0;
          padding: 0;
          li{
            margin: 10px 0;
          }
          a{
            text-decoration: none;
            color: #606060;
            transition: all .2s;
            &:hover{
              color: #232
            }
          }
          text-align: left;
          list-style: none;
        }
        img{
          top: 10px;
          width: 70px;
        }
    }
    .main{
        width: 100%;
    }
    .navbar{
        top: 0;
        width: 100%;
        padding: 15px;
        box-shadow: 0 0 5px #9999;
        ul{
            margin: 0;
            display: flex;
            justify-content: space-between;
            list-style: none;
            align-items: center;
            padding: 0 20px 0 0;
            li{
                position: relative;
            }
            li:first-child{
                display: flex;
                flex-direction: column;
                span{
                    width: 22px;
                    border-radius: 5px;
                    height: 3px;
                    margin: 2px 0;
                    background: black;
                    display: block;
                }
            }
            li:last-child::after{
                position: absolute;
                content: " ";
                top: 50%;
                right: -15px;
                transform: translateY(-50%);
                width: 0; 
                height: 0; 
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                
                border-top: 5px solid #000;
            }
        }
        #dropdown{
            background: #fff;
            box-shadow: 0 0 5px #999;
            padding: 10px 40px;
            top: 50px;
            display: none;
            position: absolute;
            right: 15px;
            button{
                background: none;
                border: none;
            }
        }
    }
    #dropdownToggle{
        cursor: pointer;
    }
</style>
