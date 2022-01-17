
enum ACT {
    //% block="前进"
    1,
    //% block="后退"
    2,
    //% block="停止"
    3,
    //% block="左转"
    4,
    //% block="右转"
    5        
}
enum DIRS {
    //% block="前进"
    1,
    //% block="后退"
    2    
}
enum LINEBWL {
    //% block="白色"
    1,
    //% block="黑色"
    2    
}
enum LINELRL {
    //% block="左"
    9,
    //% block="右"
    10,
    //% block="左和右"
    3    
}
enum BUZT {
    //% block="1/2"
    500,
    //% block="1/4"
    250，    
    //% block="1/8"
    125,
    //% block="整拍"
    1000，   
    //% block="双拍"
    2000,
    //% block="停止"
    0   
}

//% color="#AA278D" iconWidth=50 iconHeight=40
namespace Arice {
    export function CarAction(parameter: any, block: any) {
        let action = parameter.ACTION.code;
        if(action==1)
        {
            Generator.addCode(`digitalWrite(4,HIGH);\n\tdigitalWrite(7,LOW);\n\tanalogWrite(5,200);\n\tanalogWrite(6,200);`);
        }
        if(action==2)
        {
            Generator.addCode(`digitalWrite(4,LOW);\n\tdigitalWrite(7,HIGH);\n\tanalogWrite(5,200);\n\tanalogWrite(6,200);`);
        }
        if(action==3)
        {
            Generator.addCode(`analogWrite(5,0);\n\tanalogWrite(6,0);`);
        } 
        if(action==4)
        {
            Generator.addCode(`digitalWrite(4,HIGH);\n\tdigitalWrite(7,HIGH);\n\tanalogWrite(5,100);\n\tanalogWrite(6,100);`);
        } 
        if(action==5)
        {
            Generator.addCode(`digitalWrite(4,LOW);\n\tdigitalWrite(7,LOW);\n\tanalogWrite(5,100);\n\tanalogWrite(6,100);`);
        }   
    }
    //% block="左轮方向 [DIRL]左轮速度 [SPEEDL]右轮方向 [DIRR]右轮速度 [SPEEDR]" blockType="command"
    //% DIRL.shadow="dropdown" DIRL.options="DIRS" DIRL.defl="DIRS.1"
    //% DIRR.shadow="dropdown" DIRR.options="DIRS" DIRR.defl="DIRS.1"   
    //% SPEEDL.shadow="range" SPEEDL.params.min=0 SPEEDL.params.max=255 SPEEDL.defl=127
    //% SPEEDR.shadow="range" SPEEDR.params.min=0 SPEEDR.params.max=255 SPEEDR.defl=127                
    export function CarMotor(parameter: any, block: any) {
        let Ldir = parameter.DIRL.code;
        let Rdir = parameter.DIRR.code;
        let LSpeed = parameter.SPEEDL.code;
        let RSpeed = parameter.SPEEDR.code;
        if(Rdir==1)
        {
            Generator.addCode(`digitalWrite(4,HIGH);`);
        }
        else
        {
            Generator.addCode(`digitalWrite(4,LOW);`);
        }
        if(Ldir==1)
        {
            Generator.addCode(`digitalWrite(7,LOW);`);
        }
        else
        {
            Generator.addCode(`digitalWrite(7,HIGH);`);
        } 
        Generator.addCode(`analogWrite(5,${RSpeed});`);
        Generator.addCode(`analogWrite(6,${LSpeed});`);         
    }
    //% block="初始化所有氛围灯" blockType="command"
    export function InitLED(parameter: any, block: any) {
        Generator.addInclude('DFRobot_NeoPixel', '#include <DFRobot_NeoPixel.h>');
        Generator.addObject(`DFRobot_NeoPixel`, `DFRobot_NeoPixel`, `neoPixel_4;`);
        Generator.addObject(`DFRobot_NeoPixel2`, `DFRobot_NeoPixel`, `neoPixel_2;`);
        Generator.addCode(`neoPixel_4.begin(A1, 4);`);  
        Generator.addCode(`neoPixel_2.begin(13, 2);`);  
    }
    //% block="设置两个前灯亮度[BRTF]" blockType="command"
    //% BRTF.shadow="range" BRTF.params.min=0 BRTF.params.max=255 BRTF.defl=127
    export function SetBrightneF(parameter: any, block: any) {
        let brtnessF =  parameter.BRTF.code;
        Generator.addCode(`neoPixel_2.setBrightness(${brtnessF});`);
    }        
    //% block="左前[COLOR1]【RGB1-2】颜色【RGB1-1】[COLOR2]右前" blockType="command"
    //% COLOR1.shadow="colorPalette" COLOR1.defl="0x0000FF" 
    //% COLOR2.shadow="colorPalette" COLOR2.defl="0x0000FF"
    export function SetColor(parameter: any, block: any) {
        let clor2 = parameter.COLOR2.code;
        let clor1 = parameter.COLOR1.code;
        Generator.addCode(`neoPixel_2.setPixelColor(1, ${clor1});`);  
        Generator.addCode(`neoPixel_2.setPixelColor(0, ${clor2});`);  
    }
    //% block="设置侧灯和尾灯亮度[BRTB]" blockType="command"
    //% BRTB.shadow="range" BRTB.params.min=0 BRTB.params.max=255 BRTB.defl=127
    export function SetBrightneB(parameter: any, block: any) {
        let brtnessB =  parameter.BRTB.code;
        Generator.addCode(`neoPixel_4.setBrightness(${brtnessB});`);
    }
    //% block="[COLOR3]左侧【RGB2-2】颜色【RGB2-1】右侧[COLOR4]" blockType="command"
    //% COLOR3.shadow="colorPalette" COLOR3.defl="0x00FF00" 
    //% COLOR4.shadow="colorPalette" COLOR4.defl="0x00FF00"
    export function SetColor2(parameter: any, block: any) {
        let clor3 = parameter.COLOR3.code;
        let clor4 = parameter.COLOR4.code;
        Generator.addCode(`neoPixel_4.setPixelColor(1, ${clor3});`);  
        Generator.addCode(`neoPixel_4.setPixelColor(0, ${clor4});`);  
    }    
    //% block="左尾灯[COLOR5]【RGB2-3】颜色【RGB2-4】[COLOR6]右尾灯" blockType="command"
    //% COLOR5.shadow="colorPalette" COLOR5.defl="0xFF0000" 
    //% COLOR6.shadow="colorPalette" COLOR6.defl="0xFF0000"
    export function SetColor3(parameter: any, block: any) {
        let clor5= parameter.COLOR5.code;
        let clor6 = parameter.COLOR6.code;
        Generator.addCode(`neoPixel_4.setPixelColor(2, ${clor5});`);  
        Generator.addCode(`neoPixel_4.setPixelColor(3, ${clor6});`);  
    }
    //% block="氛围灯全部熄灭" blockType="command"
    export function LedClear(parameter: any, block: any) {
        Generator.addCode(`neoPixel_4.clear();`);  
        Generator.addCode(`neoPixel_2.clear();`);  
    }   
    //% block="红[RED]绿[GREEN]蓝[BLUE]" blockType="reporter"
    //% RED.shadow="range" RED.params.min=0 RED.params.max=255 RED.defl=255
    //% GREEN.shadow="range" GREEN.params.min=0 GREEN.params.max=255 GREEN.defl=255
    //% BLUE.shadow="range" BLUE.params.min=0 BLUE.params.max=255 BLUE.defl=255
    export function ColorValue(parameter: any, block: any) {
        let r = parameter.RED.code;
        let g = parameter.GREEN.code;
        let b = parameter.BLUE.code;
        Generator.addObject("GetColor","uint32_t",`rgbToColor(uint8_t r, uint8_t g, uint8_t b){
          return (uint32_t)((((uint32_t)r<<16) | ((uint32_t)g<<8)) | (uint32_t)b);
        }`);
        Generator.addCode(`rgbToColor(${r},${g},${b})`);
    }   
    //% block="车载蜂鸣器音调为[TUNE]节拍为[BEAT]" blockType="command"
    //% TUNE.shadow="note" TUNE.defl=247
    //% BEAT.shadow="dropdown" BEAT.options="BUZT" BEAT.defl="BUZT.1"
    export function Buzz(parameter: any, block: any) {
        let tunev = parameter.TUNE.code;
        let beatv = parameter.BEAT.code;
        Generator.addInclude('DFRobot_Tone', '#include <DFRobot_Libraries.h>');
        Generator.addObject(`DFRobot_Tone`, `DFRobot_Tone`, `DFTone;`);
        Generator.addCode(`DFTone.play(8, ${tunev}, ${beatv});`);       
    }
    //% block="读取超声波传感器距离（厘米）" blockType="reporter"
    export function sr04(parameter: any, block: any) {
        Generator.addInclude('DFRobot_URM10', '#include <DFRobot_URM10.h>');
        Generator.addObject(`DFRobot_URM10`, `DFRobot_URM10`, `urm10;`);
        Generator.addCode(`urm10.getDistanceCM(A3, A2)`);
    }
    //% block="[LINELR]巡线传感器碰到[LINEWB]" blockType="boolean"
    //% LINELR.shadow="dropdown" LINELR.options="LINELRL" LINELR.defl="LINELRL.1"
    //% LINEWB.shadow="dropdown" LINEWB.options="LINEBWL" LINEWB.defl="LINEBWL.1"
    export function line(parameter: any, block: any) {
        let linezy = parameter.LINELR.code;
        let linewb = parameter.LINEWB.code;
        if(linezy == 3)
        {
            if(linewb == 1)
            {Generator.addCode(`digitalRead(9)==1 && digitalRead(10)==1`);}
            else
            {Generator.addCode(`digitalRead(9)==0 && digitalRead(10)==0`);}
        }
        else
        {
            if(linewb == 1)
            {Generator.addCode(`digitalRead(${linezy})==1`);}
            else
            {Generator.addCode(`digitalRead(${linezy})==0`);}
        }
    }
    //% block="读取红外遥控接收数值" blockType="reporter"
    export function irget(parameter: any, block: any) {
        Generator.addInclude('DFRobot_IRremote', '#include <DFRobot_IRremote.h>');
        Generator.addObject(`DFRobot_IRremote`, `IRremote_Receive`, `remoteReceive_2;`);
        Generator.addSetup("DFRobot_IRremote.begin", "remoteReceive_2.begin(2);");
        Generator.addCode(`remoteReceive_2.getIrCommand()`);
    }  
}
