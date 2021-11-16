How to download and use WdatePicker calendar control


Download address: http://www.koukousky.com/wp-content/uploads/2016/01/rili2.zip

1. Display across infinite frames 

No matter where you put the date control, you don't need to worry about being blocked by the outer iframe and affecting the customer experience, because the My97 date control can be displayed across infinite frames

Example 2-7 Demonstration across an infinite framework

It can span the frame iframe indefinitely, no matter how nested the frame is, don't worry, even if there are scroll bars

2. The year calendar of the Republic of China and other special calendars 

When the year format is set to yyy format, using the year difference attribute yearOffset (default value 1911 first year of the Republic of China), the Republic of China year calendar and other special calendars can be realized

Example 2-8 Demo of the Republic of China

<input type=”text” id=”d28″ onClick=”WdatePicker({dateFmt:'yyy/MM/dd'})”/>

Note: When the year format is set to yyy, the real date will be subtracted by a difference of yearOffset (default value: 1911).If it is the year of the Republic of China, the default value can be used without additional configuration.If it is another difference, you can pass Parameter configuration

3. Bring convenience to programming 

If the value of el is this, can be omitted, that is, all of el: this can not write 
in the date box is set to disabled, prohibit changing the date (not the pop-up selection box) 
If you do not define onpicked events automatically trigger text box onchange event 
if The oncleared event is not defined. When it is cleared, the onchange event is automatically triggered

4. Other attributes 

Set the readOnly attribute, you can specify whether the date box is read-only 
Set the highLineWeekDay attribute, you can specify whether to highlight the weekend 
Set the isShowOthers attribute, you can specify whether to display the date of other months 
plus class = "Wdate" The date icon will appear on the right side of the selection box

Multi-language and custom skin

1. Multi-language support 

By lang attribute, you may be configured to control date for each individual language, of course, also be configured by WdatePicker.js global language
list of languages and language installation instructions detailed language configuration

Example 3-1 Multilingual example

Traditional Chinese: 
<input id=”d311″ class=”Wdate” type=”text” onFocus=”WdatePicker({lang:'zh-tw'})”/>

English: 
<input id=”d312″ class=”Wdate” type=”text” onFocus=”WdatePicker({lang:'en'})”/>

Simplified Chinese: 
<input id=”d313″ class=”Wdate” type=”text” onFocus=”WdatePicker({lang:'zh-cn'})”/>

Note: By default, lang='auto', that is, the language is automatically selected according to the language of the browser.

2. Customize and dynamically switch skins Go to the skin center immediately 

By skin properties, the skin may be configured to individually control for each date, of course, also be arranged through the skin of the global WdatePicker.js
skin and skin installation instructions detailed list skin configuration

Example 3-2 Skin demo

Default skin default: skin:'default'

<input id=”d321″ class=”Wdate” type=”text” onfocus=”WdatePicker()”/>

Note: skin='default' is configured in WdatePicker, so it can be omitted here.Similarly, if you configure the skin in WdatePicker as'whyGreen', then use the'whyGreen' skin without specifying the skin.

whyGreen skin: skin:'whyGreen' 

<input id=”d322″ class=”Wdate” type=”text” onfocus=”WdatePicker({skin:'whyGreen'})”/>

Note: For more skins, please go to the skin center to download

4. Date range restrictions

Static limit
Note: The date format must be consistent with realDateFmt and realTimeFmt 

You can limit the date range by configuring minDate (minimum date) and maxDate (maximum date) as static date values

Example 4-1-1 limits the date range from 2006-09-10 to 2008-12-20

<input id=”d411″ class=”Wdate” type=”text” onfocus=”WdatePicker({skin:'whyGreen',minDate:'2006-09-10′,maxDate:'2008-12-20′}) "/>

Example 4-1-2 restricted date range is from 2008-3-8 11:30:00 to 2008-3-10 20:59:30

<input type=”text” class=”Wdate” id=”d412″ onfocus=”WdatePicker({skin:'whyGreen',dateFmt:'yyyy-MM-dd HH:mm:ss',minDate:'2008-03 -08 11:30:00′,maxDate:'2008-03-10 20:59:30′})” value=”2008-03-09 11:00:00″/>

Example 4-1-3 The limit date range is February 2008 to October 2008

<input type=”text” class=”Wdate” id=”d413″ onfocus=”WdatePicker({dateFmt:'yyyy M month',minDate:'2008-2′,maxDate:'2008-10′})” />

Example 4-1-4 Limit the date range from 8:00:00 to 11:30:00

<input type=”text” class=”Wdate” id=”d414″ onfocus=”WdatePicker({dateFmt:'H:mm:ss',minDate:'8:00:00′,maxDate:'11:30: 00′})”/>

2. Dynamic limits
Note: The date format must be consistent with realDateFmt and realTimeFmt 

You can limit the date range through the dynamic variables given by the system, such as %y (current year), %M (current month), etc.

You can also use #{} to perform expression operations, such as: #{%d+1}: indicates tomorrow

Dynamic variable table

format

Explanation

%y

Current year

%M

Current month

%d

Current day

%ld

The last day of the month

%H

Present

%m

Current points

%s

Current seconds

#{}

Operation expression, such as: #{%d+1}: means tomorrow

#F{}

Between {} is a function to write custom JS code

Example 4-2-1 can only select dates before today (including today)

<input id=”d421″ class=”Wdate” type=”text” onfocus=”WdatePicker({skin:'whyGreen',maxDate:'%y-%M-%d'})”/>

Example 4-2-2 The operation expression is used. Only dates after today (excluding today) can be selected

<input id=”d422″ class=”Wdate” type=”text” onfocus=”WdatePicker({minDate:'%y-%M-#{%d+1}'})”/>

Example 4-2-3 can only select the date of the month 1 to the last day of the month

<input id=”d423″ class=”Wdate” type=”text” onfocus=”WdatePicker({minDate:'%y-%M-01′,maxDate:'%y-%M-%ld'})” />

Example 4-2-4 can only select the date from today 7:00:00 to tomorrow 21:00:00

<input id=”d424″ class=”Wdate” type=”text” onfocus=”WdatePicker({dateFmt:'yyyy-Md H:mm:ss',minDate:'%y-%M-%d 7:00 :00′,maxDate:'%y-%M-#{%d+1} 21:00:00′})”/>

Example 4-2-5 The operation expression is used. Only days from 20 hours before to 30 hours can be selected

period

<input id=”d425″ class=”Wdate” type=”text” onClick=”WdatePicker({dateFmt:'yyyy-MM-dd HH:mm',minDate:'%y-%M-%d #{% H-20}:%m:%s',maxDate:'%y-%M-%d #{%H+30}:%m:%s'})”/>

1. Script customization restrictions
Note: The date format must be consistent with realDateFmt and realTimeFmt 

The system provides two APIs, $dp.$D and $dp.$DV, to assist you with date calculations. In addition, you can do whatever you want by filling in your custom script in #F{} Date restrictions

Example 4-3-1 The preceding date cannot be greater than the following date and neither date can be greater than 2020-10-01

The contract is valid from to 
<input id=”d4311″ class=”Wdate” type=”text” onFocus=”WdatePicker({maxDate:'#F{$dp.$D(\'d4312\')||\'2020 -10-01\'}'})”/> 
<input id=”d4312″ class=”Wdate” type=”text” onFocus=”WdatePicker({minDate:'#F{$dp.$D(\' d4311\')}',maxDate:'2020-10-01′})”/>

Note:
The date format of the two dates must be the same

$dp.$ is equivalent to the document.getElementById function.
So why does the 'use \'in it? That's because both ”and' are used by peripheral functions, so the escape character \ is used, otherwise it will prompt JS syntax error.
So When you use it in other places, please pay attention to change \'to "or" to use.

#F{$dp.$D(\'d4312\')||\'2020-10-01\'} means that when d4312 is empty, the value of 2020-10-01 is used as the maximum value

Example 4-3-2 The previous date + 3 days cannot be greater than the later date

Date from to 
<input type=”text” class=”Wdate” id=”d4321″ onFocus=”WdatePicker({maxDate:'#F{$dp.$D(\'d4322\',{d:-3} );}'})”/>
<input type=”text” class=”Wdate” id=”d4322″ onFocus=”WdatePicker({minDate:'#F{$dp.$D(\'d4321\', {d:3});}'})”/>

Use the $dp.$D function to add the value of the date box to the defined date difference:
two parameters: id={character type} the id value of the text box to be processed, obj={object type} date difference Quantity
date difference usage:
attributes y, M, d, H, m, s respectively represent year, month, day, hour, minute, second