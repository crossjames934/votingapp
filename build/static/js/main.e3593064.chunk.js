(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{23:function(e,t,a){e.exports=a(51)},48:function(e,t,a){},51:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(22),i=a.n(r),o=a(14),c=a(2),l=a(3),u=a(6),h=a(4),d=a(5),p=a(1),m=a(7),g=a.n(m),f=(a(48),function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(u.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(s)))).logout=function(){g.a.get("/logout").then(function(e){console.log(e.data),a.props.updateParentState({authenticated:!1,username:"",attemptedLogin:!1})}).catch(function(e){alert("There was an error connecting, please check console for the error"),console.log(e)})},a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"notAuthenticated",value:function(){return s.a.createElement("div",{className:"authenticationLinks"},s.a.createElement("p",{className:"clickableText",onClick:this.props.showRegister},"Register"),s.a.createElement("p",null," || "),s.a.createElement("p",{className:"clickableText",onClick:this.props.showLogin},"Log In"))}},{key:"authenticated",value:function(){return s.a.createElement("div",null,s.a.createElement("p",null,"Welcome ",this.props.username),s.a.createElement("p",{className:"clickableText",onClick:this.logout},"Sign Out"))}},{key:"render",value:function(){return s.a.createElement("div",null,this.props.authenticated?this.authenticated():this.notAuthenticated())}}]),t}(n.Component)),b=a(9),v=a.n(b),w=a(11),E=function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"closeWidgetBtn"},s.a.createElement("p",{onClick:this.props.close,className:"innerX"},"X"))}}]),t}(n.Component),y=a(8),k=a.n(y),O=function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(l.a)(t,[{key:"options",value:function(){var e=this,t=Object(o.a)(this.props.widgets);this.props.authenticated&&(t=t.filter(function(e){return"Login"!==e&&"Register"!==e}));var a=t.map(function(t){var a=e.props.visibleWidgets.includes(t),n={textShadow:a?"0 0 2px gold":"none",cursor:"pointer"},r=function(){var n=Object(w.a)(v.a.mark(function n(){return v.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,a;case 2:if(!n.sent){n.next=6;break}e.props.closeWidget(t),n.next=7;break;case 6:e.props.showWidget(t);case 7:e.props.bringMenuToFront();case 8:case"end":return n.stop()}},n)}));return function(){return n.apply(this,arguments)}}();return s.a.createElement("li",{key:t,onClick:r,style:n},t)});return s.a.createElement("ul",{className:"mainMenuOptions"},a)}},{key:"render",value:function(){return s.a.createElement("div",{id:this.props.id,className:"widget",style:k()(this.props.order,this.props.showing)},s.a.createElement("div",{className:"scrollable"},s.a.createElement(E,{close:this.props.close}),s.a.createElement("h2",null,"Main Menu"),this.options()))}}]),t}(n.Component),S=function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{id:this.props.id,className:"widget",style:k()(this.props.order,this.props.showing)},s.a.createElement("div",{className:"scrollable"},s.a.createElement(E,{close:this.props.close}),s.a.createElement("h2",null,"Welcome to Cross Voting"),s.a.createElement("p",null,"Here you can make your own polls, and have your friends vote on them."),s.a.createElement("p",null,"You can do all this without making an account, but if you want to make lots of polls you will need to register."),s.a.createElement("p",null,"Registering is super easy, you can do it with a couple clicks if you use your Facebook or Google account."),s.a.createElement("p",null,"You can also register using traditional means too.")))}}]),t}(n.Component),j=a(12),C="dateAdded",N=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(h.a)(t).call(this,e))).state={searchQuery:"",list:[],sortBy:C},a.showList=a.showList.bind(Object(p.a)(Object(p.a)(a))),a.handleChange=a.handleChange.bind(Object(p.a)(Object(p.a)(a))),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.getPollList()}},{key:"getPollList",value:function(){var e=Object(w.a)(v.a.mark(function e(){var t,a;return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,g.a.get("pollList");case 3:return t=e.sent,(a=t.data).forEach(function(e){e.dateAdded=new Date(e.dateAdded),e.lastVotedOn=new Date(e.lastVotedOn)}),e.next=8,this.setState({list:a});case 8:this.sortList(this.state.sortBy),e.next=15;break;case 11:e.prev=11,e.t0=e.catch(0),alert("There was an error getting polls from the server, see console for error."),console.log(e.t0);case 15:case"end":return e.stop()}},e,this,[[0,11]])}));return function(){return e.apply(this,arguments)}}()},{key:"showList",value:function(){var e=this,t=this.state.list;if(this.state.searchQuery.length>0)try{var a=new RegExp(this.state.searchQuery,"gi");t=t.filter(function(e){return a.test(e.question)})}catch(n){console.log("invalid regex")}return t.map(function(t){return s.a.createElement("div",null,s.a.createElement("p",{className:"pollMenuChoice",onClick:function(){e.props.updateParentState({showingPollId:t.id}),e.props.showPoll()}},t.question))})}},{key:"sortList",value:function(e){var t=this.state.list.sort(function(t,a){return a[e]-t[e]});this.setState({list:t,sortBy:e},this.showList)}},{key:"handleChange",value:function(e){this.setState(Object(j.a)({},e.target.name,e.target.value))}},{key:"componentDidUpdate",value:function(){this.props.needsUpdate&&(this.props.updateParentState({pollMenuNeedsUpdate:!1}),this.getPollList())}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{id:this.props.id,className:"widget",style:k()(this.props.order,this.props.showing)},s.a.createElement("div",{className:"scrollable"},s.a.createElement(E,{close:this.props.close}),s.a.createElement("h2",null,"Poll Menu"),s.a.createElement("div",null,s.a.createElement("input",{onChange:this.handleChange,name:"searchQuery",value:this.state.searchQuery,className:"searchBar",type:"text"}),s.a.createElement("div",{className:"sortBy"},s.a.createElement("p",{onClick:function(){e.sortList(C)},className:"clickableText"},"Recently made"),s.a.createElement("p",{onClick:function(){e.sortList("lastVotedOn")},className:"clickableText"},"Last voted on"),s.a.createElement("p",{onClick:function(){e.sortList("voteCount")},className:"clickableText"},"Most votes")),s.a.createElement("span",{"aria-label":"magnifying glass search icon",role:"img",className:"searchIcon"},"\ud83d\udd0d"),this.showList())))}}]),t}(n.Component),P=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(h.a)(t).call(this,e))).state={question:"",choices:["",""],submitAttempted:!1,submitSucceeded:!1},a.handleChange=a.handleChange.bind(Object(p.a)(Object(p.a)(a))),a.handleSubmit=a.handleSubmit.bind(Object(p.a)(Object(p.a)(a))),a.addNewChoice=a.addNewChoice.bind(Object(p.a)(Object(p.a)(a))),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"handleChange",value:function(e){this.setState(Object(j.a)({},e.target.name,e.target.value))}},{key:"handleSubmit",value:function(){var e=Object(w.a)(v.a.mark(function e(t){var a,n,s,r,i=this;return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.setState({submitAttempted:!0});case 2:a=this.props.username,n=this.state,s=n.question,r=n.choices,g.a.post("/poll",{question:s,choices:r,author:a}).then(function(e){if(200!==e.status)return alert("There was a problem after connecting to the server, see console for more information"),console.log(e);i.setState({question:"",choices:["",""],submitSucceeded:!0}),i.props.updateParentState({pollMenuNeedsUpdate:!0})}).catch(function(e){i.setState({submitSucceeded:!1,submitAttempted:!1}),console.log(e)}),t.preventDefault();case 6:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"blankSpace",value:function(){return s.a.createElement("div",{style:{width:30,height:30}}," ")}},{key:"choices",value:function(){var e=this;return this.state.choices.map(function(t,a){return s.a.createElement("div",{key:"choice_"+a,className:"spaceAround"},s.a.createElement("p",null,"Choice ",a+1,": "),s.a.createElement("input",{onChange:function(t){var n=e.state.choices.slice();n[a]=t.target.value,e.setState({choices:n})},value:e.state.choices[a],type:"text",required:!0}),e.state.choices.length>2?s.a.createElement("p",{onClick:function(){var t=e.state.choices.slice();t.splice(a,1),e.setState({choices:t})},className:"innerX"},"X"):e.blankSpace())})}},{key:"addNewChoice",value:function(e){this.setState({choices:[].concat(Object(o.a)(this.state.choices),[""])}),e.preventDefault()}},{key:"showSubmitStatus",value:function(){var e=this,t=this.state.submitSucceeded?"Poll successfully submitted":"Sending...";return s.a.createElement("div",null,s.a.createElement("p",{className:"red"},t),s.a.createElement("p",{onClick:function(){e.setState({submitAttempted:!1,submitSucceeded:!1})},className:"clickableText"},"Back"))}},{key:"showForm",value:function(){return s.a.createElement("form",{onSubmit:this.handleSubmit},s.a.createElement("div",{className:"spaceAround"},s.a.createElement("p",null,"Question: "),s.a.createElement("input",{name:"question",onChange:this.handleChange,type:"text",value:this.state.question,required:!0}),this.blankSpace()),this.choices(),s.a.createElement("button",{className:"addNewChoiceBtn",onClick:this.addNewChoice},"Add New Choice"),s.a.createElement("br",null),s.a.createElement("input",{className:"submitBtn",type:"submit",value:"Submit Poll"}))}},{key:"render",value:function(){return s.a.createElement("div",{id:this.props.id,className:"widget",style:k()(this.props.order,this.props.showing)},s.a.createElement("div",{className:"scrollable"},s.a.createElement(E,{close:this.props.close}),s.a.createElement("h2",null,"Create New Poll"),this.state.submitAttempted?this.showSubmitStatus():this.showForm()))}}]),t}(n.Component),W=a(13),x=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(h.a)(t).call(this,e))).state={pollId:a.props.pollId,submittedVote:!1,pollData:{question:"",choices:[],author:""},responseData:[]},a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidUpdate",value:function(){this.props.pollId!==this.state.pollId&&this.setState({pollId:this.props.pollId,submittedVote:!1},this.getPollData)}},{key:"getPollData",value:function(){var e=Object(w.a)(v.a.mark(function e(){var t,a;return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,g.a.get("pollData/"+this.props.pollId);case 3:t=e.sent,a=t.data,this.setState({pollData:a}),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(0),alert("There was an error getting the poll data from the server"),console.log(e.t0);case 12:case"end":return e.stop()}},e,this,[[0,8]])}));return function(){return e.apply(this,arguments)}}()},{key:"castVote",value:function(){var e=Object(w.a)(v.a.mark(function e(t){var a,n,s;return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,a=this.props.username,this.props.authenticated){e.next=7;break}return e.next=5,g.a.get("ip");case 5:n=e.sent,a=n.data;case 7:return e.next=9,g.a.post("/castVote",{choice:t,id:this.props.pollId,username:a});case 9:s=e.sent,this.setState({responseData:s.data,submittedVote:!0}),this.props.updateParentState({pollMenuNeedsUpdate:!0}),e.next=18;break;case 14:e.prev=14,e.t0=e.catch(0),alert("There was an error getting information to or from the server. Please check console for error."),console.log(e.t0);case 18:case"end":return e.stop()}},e,this,[[0,14]])}));return function(t){return e.apply(this,arguments)}}()},{key:"showChoiceBtns",value:function(){var e=this,t=this.state.pollData.choices.map(function(t){return s.a.createElement("button",{className:"choiceBtn",onClick:function(){return e.castVote(t)}},t)});return s.a.createElement("div",{className:"userChoices"},t)}},{key:"showResults",value:function(){var e=[],t=this.state.responseData.map(function(t){var a=t.choice,n=t.count;return n>0&&e.push(a),s.a.createElement("p",null,a,": ",n," votes")});console.log(this.state.responseData);var a={};this.state.responseData.forEach(function(e){e.count&&(a[e.choice]=e.count)});var n=document.getElementById("donut_chart");n&&(n.innerHTML="");var r=Math.min(250,250)/2-40,i=W.f("#donut_chart").append("svg").attr("width",250).attr("height",250).append("g").attr("transform","translate(125,125)"),o=a,c=W.d().domain(e).range(W.e),l=W.c().sort(null).value(function(e){return e.value})(W.b(o)),u=W.a().innerRadius(.5*r).outerRadius(.8*r),h=W.a().innerRadius(.9*r).outerRadius(.9*r);return i.selectAll("allSlices").data(l).enter().append("path").attr("d",u).attr("fill",function(e){return c(e.data.key)}).attr("stroke","white").style("stroke-width","2px").style("opacity",.7),i.selectAll("allPolylines").data(l).enter().append("polyline").attr("stroke","black").style("fill","none").attr("stroke-width",1).attr("points",function(e){var t=u.centroid(e),a=h.centroid(e),n=h.centroid(e),s=e.startAngle+(e.endAngle-e.startAngle)/2;return n[0]=.95*r*(s<Math.PI?1:-1),[t,a,n]}),i.selectAll("allLabels").data(l).enter().append("text").text(function(e){return console.log(e.data.key),e.data.key}).attr("transform",function(e){var t=h.centroid(e),a=e.startAngle+(e.endAngle-e.startAngle)/2;return t[0]=.99*r*(a<Math.PI?1:-1),"translate("+t+")"}).style("text-anchor",function(e){return e.startAngle+(e.endAngle-e.startAngle)/2<Math.PI?"start":"end"}),s.a.createElement("div",null,s.a.createElement("h3",null,"Results:"),s.a.createElement("div",{id:"donut_chart"}),t)}},{key:"render",value:function(){return s.a.createElement("div",{id:this.props.id,className:"widget",style:k()(this.props.order,this.props.showing)},s.a.createElement("div",{className:"scrollable"},s.a.createElement(E,{close:this.props.close}),s.a.createElement("h2",null,this.state.pollData.question),this.state.submittedVote?this.showResults():this.showChoiceBtns()))}}]),t}(n.Component),M=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(h.a)(t).call(this,e))).state={username:"",password:"",email:"",submitted:!1,errorMessage:""},a.successMessage="Registered successfully, please check email for activation link.",a.handleChange=a.handleChange.bind(Object(p.a)(Object(p.a)(a))),a.handleSubmit=a.handleSubmit.bind(Object(p.a)(Object(p.a)(a))),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"handleChange",value:function(e){this.setState(Object(j.a)({},e.target.name,e.target.value))}},{key:"handleSubmit",value:function(e){var t=this,a=this.state,n=a.username,s=a.password,r=a.email;g.a.post("/register",{username:n,password:s,email:r}).then(function(e){return 200!==e.status?(alert("There was a problem connecting to the server, see console for more information"),console.log(e)):e.data!==t.successMessage?t.setState({errorMessage:e.data},function(){setTimeout(function(){t.setState({errorMessage:""})},5e3)}):void t.setState({username:"",password:"",email:"",submitted:!0,errorMessage:""})}).catch(function(e){return alert("There was a problem connecting to the server, see console for more information"),console.log(e)}),e.preventDefault()}},{key:"registrationForm",value:function(){return s.a.createElement("form",{onSubmit:this.handleSubmit},s.a.createElement("div",{className:"spaceAround"},s.a.createElement("p",null,"Username:"),s.a.createElement("input",{onChange:this.handleChange,name:"username",type:"text",id:"registeringUsername",value:this.state.username,required:!0})),s.a.createElement("div",{className:"spaceAround"},s.a.createElement("p",null,"Password:"),s.a.createElement("input",{onChange:this.handleChange,name:"password",type:"password",id:"registeringPassword",value:this.state.password,required:!0})),s.a.createElement("div",{className:"spaceAround"},s.a.createElement("p",null,"Email:"),s.a.createElement("input",{onChange:this.handleChange,name:"email",type:"email",id:"registeringEmail",value:this.state.email,required:!0})),s.a.createElement("input",{className:"submitBtn",type:"submit",value:"Submit"}),s.a.createElement("p",{className:"red"},this.state.errorMessage))}},{key:"showSuccess",value:function(){var e=this;return s.a.createElement("div",null,s.a.createElement("p",null,this.successMessage),s.a.createElement("p",{className:"red"},"You may need to check the spam folder."),s.a.createElement("p",{className:"clickableText",onClick:function(){e.setState({submitted:!1})}},"Back"))}},{key:"render",value:function(){return s.a.createElement("div",{id:this.props.id,className:"widget",style:k()(this.props.order,this.props.showing)},s.a.createElement("div",{className:"scrollable"},s.a.createElement(E,{close:this.props.close}),s.a.createElement("h2",null,"Register"),this.state.submitted?this.showSuccess():this.registrationForm()))}}]),t}(n.Component),L=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(h.a)(t).call(this,e))).state={username:"",password:"",failedMessage:""},a.handleChange=a.handleChange.bind(Object(p.a)(Object(p.a)(a))),a.handleSubmit=a.handleSubmit.bind(Object(p.a)(Object(p.a)(a))),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"handleChange",value:function(e){this.setState(Object(j.a)({},e.target.name,e.target.value))}},{key:"handleSubmit",value:function(e){var t=this;this.props.updateParentState({attemptedLogin:!0}),this.setState({failedMessage:""});var a=this.state,n=a.username,s=a.password;g.a.post("/login",{username:n,password:s}).then(function(e){if(200!==e.status)return alert("There was a problem after connecting to the server, see console for more information"),console.log(e);e.data.loggedIn?(t.props.updateParentState({authenticated:!0,username:e.data.message}),t.setState({username:"",password:""}),setTimeout(t.props.close,2e3)):(t.setState({failedMessage:e.data.message}),t.props.updateParentState({attemptedLogin:!1}))}).catch(function(e){console.log(e),t.setState({failedMessage:"Trouble connecting to server. Potentially from loss of internet connection. See console for more details"}),t.props.updateParentState({attemptedLogin:!1})}),e.preventDefault()}},{key:"attemptedLogin",value:function(){var e=this.props.authenticated?"You have logged in successfully!":"Please wait...";return s.a.createElement("div",null,s.a.createElement("p",null,e))}},{key:"loginForm",value:function(){return s.a.createElement("div",null,s.a.createElement("form",{onSubmit:this.handleSubmit},s.a.createElement("div",{className:"spaceAround"},s.a.createElement("p",null,"Username:"),s.a.createElement("input",{onChange:this.handleChange,name:"username",type:"text",id:"loginUsername",value:this.state.username,required:!0})),s.a.createElement("div",{className:"spaceAround"},s.a.createElement("p",null,"Password:"),s.a.createElement("input",{onChange:this.handleChange,name:"password",type:"password",id:"loginPassword",value:this.state.password,required:!0})),s.a.createElement("input",{className:"submitBtn",type:"submit",value:"Submit"})))}},{key:"render",value:function(){return s.a.createElement("div",{id:this.props.id,className:"widget",style:k()(this.props.order,this.props.showing)},s.a.createElement("div",{className:"scrollable"},s.a.createElement(E,{close:this.props.close}),s.a.createElement("h2",null,"Login"),this.props.attemptedLogin?this.attemptedLogin():this.loginForm(),s.a.createElement("p",{className:"red"},this.state.failedMessage)))}}]),t}(n.Component),A="Intro",T="Main Menu",D="Poll Menu",I=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(h.a)(t).call(this,e))).state={authenticated:!1,username:"",visibleWidgets:[A,D],attemptedLogin:!1,showingPollId:"",pollMenuNeedsUpdate:!1},a.closeWidget=a.closeWidget.bind(Object(p.a)(Object(p.a)(a))),a.showWidget=a.showWidget.bind(Object(p.a)(Object(p.a)(a))),a.updateParentState=a.updateParentState.bind(Object(p.a)(Object(p.a)(a))),a.bringMenuToFront=a.bringMenuToFront.bind(Object(p.a)(Object(p.a)(a))),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;g.a.get("/whoami").then(function(t){t.data&&e.setState({authenticated:!0,username:t.data})}).catch(function(e){console.log(e)})}},{key:"updateParentState",value:function(e){this.setState(e)}},{key:"closeWidget",value:function(e){this.setState({visibleWidgets:this.state.visibleWidgets.filter(function(t){return t!==e})})}},{key:"showWidget",value:function(e){var t=this.state.visibleWidgets.includes(T),a=this.state.visibleWidgets.filter(function(e){return e!==T}),n=[e].concat(Object(o.a)(a));t&&n.unshift(T),this.setState({visibleWidgets:n})}},{key:"bringMenuToFront",value:function(){var e=this.state.visibleWidgets.filter(function(e){return e!==T});this.setState({visibleWidgets:[T].concat(Object(o.a)(e))})}},{key:"render",value:function(){var e=this,t=function(t){return e.state.visibleWidgets.indexOf(t)},a=function(t){return e.state.visibleWidgets.includes(t)};return s.a.createElement("div",{className:"App"},s.a.createElement("header",{className:"App-header"},s.a.createElement("p",{className:"hamburgerIcon",onClick:function(){e.showWidget(T)}},"\u2630"),s.a.createElement("h1",{id:"mainTitle"},"Voting App"),s.a.createElement(f,{authenticated:this.state.authenticated,username:this.state.username,showRegister:function(){return e.showWidget("Register")},showLogin:function(){return e.showWidget("Login")},updateParentState:this.updateParentState})),s.a.createElement("main",null,s.a.createElement(O,{widgets:[A,D,"Create New Poll","Register","Login"],order:t(T),showing:a(T),close:function(){e.closeWidget(T)},visibleWidgets:this.state.visibleWidgets,showWidget:this.showWidget,closeWidget:this.closeWidget,bringMenuToFront:this.bringMenuToFront,authenticated:this.state.authenticated,id:T.replace(/\s/g,"")}),s.a.createElement(S,{order:t(A),showing:a(A),close:function(){e.closeWidget(A)},id:A.replace(/\s/g,"")}),s.a.createElement(N,{order:t(D),showing:a(D),close:function(){e.closeWidget(D)},showPoll:function(){return e.showWidget("Show Poll")},updateParentState:this.updateParentState,needsUpdate:this.state.pollMenuNeedsUpdate,id:D.replace(/\s/g,"")}),s.a.createElement(P,{order:t("Create New Poll"),showing:a("Create New Poll"),close:function(){e.closeWidget("Create New Poll")},authenticated:this.state.authenticated,username:this.state.username,updateParentState:this.updateParentState,id:"Create New Poll".replace(/\s/g,"")}),s.a.createElement(x,{order:t("Show Poll"),showing:a("Show Poll"),close:function(){e.closeWidget("Show Poll")},pollId:this.state.showingPollId,authenticated:this.state.authenticated,username:this.state.username,updateParentState:this.updateParentState,id:"Show Poll".replace(/\s/g,"")}),s.a.createElement(M,{order:t("Register"),showing:a("Register"),close:function(){e.closeWidget("Register")},id:"Register".replace(/\s/g,"")}),s.a.createElement(L,{order:t("Login"),showing:a("Login"),close:function(){e.closeWidget("Login")},authenticated:this.state.authenticated,attemptedLogin:this.state.attemptedLogin,updateParentState:this.updateParentState,id:"Login".replace(/\s/g,"")}),s.a.createElement("p",{className:"noWidgetMsg",onClick:function(){e.showWidget(T)}},0===this.state.visibleWidgets.length?"Click here or \u2630 for the menu":"")))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(s.a.createElement(I,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},8:function(e,t){e.exports=function(e,t){return{order:e,display:t?"block":"none",width:400,animation:"appear 1s ease-out ".concat(100*e,"ms forwards")}}}},[[23,1,2]]]);
//# sourceMappingURL=main.e3593064.chunk.js.map