;(function($){
/**
 * jqGrid Chinese Translation for v4.2
 * henryyan 2011.11.30
 * http://www.wsria.com
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * 
 * update 2011.11.30
 *		add double u3000 SPACE for search:odata to fix SEARCH box display err when narrow width from only use of eq/ne/cn/in/lt/gt operator under IE6/7
**/
$.jgrid = $.jgrid || {};
$.extend($.jgrid,{
	defaults : {
		recordtext: "View {0} - {1} of {2}",	// Full-width space before common words
		emptyrecords: "No data displayed",
		loadtext: "Loading...",
		savetext: "Saving...",
		pgtext: "Page {0} of {1}",
		pgfirst: "First Page",
		pglast: "Last Page",
		pgnext: "Next Page",
		pgprev: "Previous Page",
		pgrecs: "Records per Page",
		showhide: "Toggle Expand Collapse Grid",
		// mobile
		pagerCaption: "Grid::Page Settings",
		pageText: "Page:",
		recordPage: "Records per Page",
		nomorerecs: "No more records...",
		scrollPullup: "Pull up to load more...",
		scrollPulldown: "Pull down to refresh...",
		scrollRefresh: "Release to refresh..."
	},
	search : {
		caption: "search for...",
		Find: "Find",
		Reset: "Reset",
		odata: ['equal\u3000\u3000', 'Not wait\u3000\u3000', 'Less than\u3000\u3000', 'Less than or equal to', 'more than the\u3000\u3000','greater or equal to', 
			'Start at', 'Does not start at', 'belong\u3000\u3000', 'Does not belong', 'Ends at', 'Does not end in', 'contain\u3000\u3000', 'Not included', 'Null on\u3000\u3000','Non-null'],
		groupOps: [{ op: "AND", text: "all" }, { op: "OR", text: "Either" }	],
		matchText: " match",
		rulesText: " rule"
	},
	edit : {
		addCaption: "Add record",
		editCaption: "Edit record",
		bSubmit: "Submit",
		bCancel: "Cancel",
		bClose: "Close/Abort",
		saveData: "Data has changed, Do you want to save？",
		bYes : "Yes",
		bNo : "No",
		bExit : "Cancel",
		msg: {
			required:"This field is required",
			number:"Please enter a valid number",
			minValue:"The input value must be greater than or equal to ",
			maxValue:"The input value must be less than or equal to ",
			email: "This is not a valid e-mail address",
			integer: "Please enter a valid integer",
			date: "Please enter a valid time",
			url: "Invalid URL. The prefix must be ('http: //' or 'https: //')",
			nodefined: " Undefined！",
			novalue: " Need return value！",
			customarray: "Custom function needs to return an array！",
			customfcheck : "Custom function should be present in case of custom checking!"
			
		}
	},
	view : {
		caption: "View history",
		bClose: "shut down"
	},
	del : {
		caption: "delete",
		msg: "Delete selected records？",
		bSubmit: "delete",
		bCancel: "cancel"
	},
	nav : {
		edittext: "",
		edittitle: "Edit selected records",
		addtext:"",
		addtitle: "Add new record",
		deltext: "",
		deltitle: "Delete selected records",
		searchtext: "",
		searchtitle: "Find",
		refreshtext: "",
		refreshtitle: "Refresh table",
		alertcap: "note",
		alerttext: "Please select a record",
		viewtext: "",
		viewtitle: "View selected records"
	},
	col : {
		caption: "Select column",
		bSubmit: "Submit",
		bCancel: "Cancel/Abort"
	},
	errors : {
		errcap: "error",
		nourl: "no setting url",
		norecords: "No records to process",
		model: "colNames with colModel Variable length！"
	},
	formatter : {
		integer : {thousandsSeparator: " ", defaultValue: '0'},
		number : {decimalSeparator:".", thousandsSeparator: " ", decimalPlaces: 2, defaultValue: '0.00'},
		currency : {decimalSeparator:".", thousandsSeparator: " ", decimalPlaces: 2, prefix: "", suffix:"", defaultValue: '0.00'},
		date : {
			dayNames:   [
				"Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat",
		         "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
			],
			monthNames: [
				"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
				"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
			],
			AmPm : ["am","pm","AM","PM"],
			S: function (j) {return j < 11 || j > 13 ? ['st', 'nd', 'rd', 'th'][Math.min((j - 1) % 10, 3)] : 'th'},
			srcformat: 'Y-m-d',
			newformat: 'm-d-Y',
			masks : {
				ISO8601Long:"Y-m-d H:i:s",
				ISO8601Short:"Y-m-d",
				ShortDate: "Y/j/n",
				LongDate: "l, F d, Y",
				FullDateTime: "l, F d, Y g:i:s A",
				MonthDay: "F d",
				ShortTime: "g:i A",
				LongTime: "g:i:s A",
				SortableDateTime: "Y-m-d\\TH:i:s",
				UniversalSortableDateTime: "Y-m-d H:i:sO",
				YearMonth: "F, Y"
			},
			reformatAfterEdit : false
		},
		baseLinkUrl: '',
		showAction: '',
		target: '',
		checkbox : {disabled:true},
		idName : 'id'
	}
});
})(jQuery);
