(this.webpackJsonpphase10_clone=this.webpackJsonpphase10_clone||[]).push([[0],{53:function(e,t,n){e.exports=n(97)},58:function(e,t,n){},59:function(e,t,n){},93:function(e,t){},97:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(12),l=n.n(c),u=(n(58),n(59),n(60),n(6)),i=n(8),o=n(13),s=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_CHAT":return[].concat(Object(i.a)(e),[t.msg]);default:return e}},m=Object(o.combineReducers)({playerName:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_NAME":return t.name;default:return e}},playerID:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_ID":return t.id;default:return e}},hostID:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_HOSTID":return t.hostID;default:return e}},playerList:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_PLAYERLIST":return t.playerList;default:return e}},chatLog:s,gameState:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"WAITING",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_GAMESTATE":return t.gameState;default:return e}},playerState:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"PICKUP",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_PLAYERSTATE":return""!=t.playerState?t.playerState:"DISCARD"==e?"PICKUP":"DISCARD";default:return e}},playerHand:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_PLAYERHAND":return t.hand;default:return e}},currentPlayer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_TURN":return t.currentPlayer?t.currentPlayer:e;default:return e}},discardPile:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_PILE":return t.discardPile?t.discardPile:e;default:return e}},phases:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_PHASES":return t.phases?t.phases:e;default:return e}}}),d=n(51),f=Object(o.createStore)(m,Object(d.composeWithDevTools)()),E=function(){var e=f.getState();return e.playerList.find((function(t){return t.id==e.playerID})).phase},p=function(){var e=f.getState();return e.currentPlayer==e.playerID},h=function(){var e=f.getState();return Object(i.a)(e.playerHand)},v=[function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=arguments.length>1?arguments[1]:void 0;if(t.length<n)return!1;var a=!0;return t.forEach((function(t){"Wild"!=t.type?"Skip"!=t.type?null==e?(e=t,a=a&&!0):a=e.number==t.number?a&&!0:a&&!1:a=a&&!1:a=a&&!0})),a},function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;if(e.length<t)return!1;var n,a=Object(i.a)(e),r=!0,c=0,l=0;return y(a),a.forEach((function(t,a){if(null==n){if("Wild"==t.type)return r=r&&!0,c++,void(l=a+1);if("Skip"==t.type)return void(r=r&&!1);if((n=parseInt(t.number))-c<=0)return void(r=r&&!1);for(var u=l-c;u<l;u++)e[u].number=n-c+u;r=r&&!0}else if("Wild"==t.type)n++,t.number=n,r=r&&!0;else{if("Skip"==t.type)return void(r=r&&!1);var i=parseInt(t.number);i==n+1?(r=r&&!0,n=i):r=r&&!1}})),r&&(e=a),r},function(e,t){var n,a=!0;return e.forEach((function(e){if(n)switch(e.type){case"Wild":a=a&&!0;break;case"Skip":a=a&&!1;break;default:a=a&&e.type==n}else switch(e.type){case"Wild":a=a&&!0;break;case"Skip":a=a&&!1;break;default:n=e.type,a=a&&!0}})),a}],y=function(e){for(var t=[],n=[],a=[],r=0;r<e.length;r++)0==e[r].number&&t.push(r);n=e.filter((function(e){return 0==e.number})),(a=e.filter((function(e){return e.number>0}))).sort((function(e,t){return e.number>t.number}));r=0;for(var c=0;t.length>0;)c<a.length&&t[0]>c?c++:c<a.length&&t[0]<=c?(a.splice(c,0,n.pop()),c++,t.splice(0,1)):(a.push(n.pop()),t.splice(0,1))},b=n(52),S=n.n(b)()("http://69.202.129.35:13337",{timeout:5e3,reconnection:!1});console.log("http://69.202.129.35:13337");var g=function(){S.emit("CREATE_HAND")},D=function(){return r.a.createElement(r.a.Fragment,null,function(){var e=f.getState();return e.hostID==e.playerID}()?r.a.createElement("button",{onClick:function(e){e.preventDefault(),function(){var e=f.getState();return!(e.playerList.length<2)&&!e.playerList.some((function(e){return"NOT_READY"==e.STATE}))}()&&S.emit("START_GAME")}},"Start Game"):r.a.createElement("button",{onClick:function(e){e.preventDefault(),S.emit("READY"),e.target.disabled=!0}},"Ready"))},P=n(10),k=function(e){var t={backgroundColor:function(){switch(e.card.type){case"Red":return"#ff0000";case"Green":return"#00ff00";case"Blue":return"#3672F2";case"Yellow":return"#ffff00";case"Wild":case"Skip":return"#ffffff"}}()};return r.a.createElement("div",{className:"Card",style:t,key:e.index,id:e.index,onClick:e.click},r.a.createElement("h2",null,e.card.type),r.a.createElement("h1",null,e.card.number))},A=function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,r.a.createElement("h2",{style:{color:"white",textDecoration:"underline"}},"Completed Stacks"),e.holdDeck.map((function(e){return r.a.createElement("div",{className:"Container"},e.deck.map((function(e,t){return r.a.createElement(k,{card:e,index:t})})))}))))},T=n(14),C=function(e){var t=Object(a.useState)([]),n=Object(P.a)(t,2),c=n[0],l=n[1],u=Object(a.useState)([]),o=Object(P.a)(u,2),s=o[0],m=(o[1],Object(a.useState)([])),d=Object(P.a)(m,2),f=d[0],E=d[1];Object(a.useEffect)((function(){e.currentPhases.patterns.forEach((function(e){s.push({desc:e.desc,funcID:e.funcID,deck:[]})})),E(h())}),[]);var p=function(e){e.preventDefault(),l([].concat(Object(i.a)(c),[f[e.currentTarget.id]])),f.splice(e.currentTarget.id,1)},y=function(e){e.preventDefault(),f.push(c[e.currentTarget.id]),c.splice(e.currentTarget.id,1),l(Object(i.a)(c))};return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"SubmissionView"},r.a.createElement("div",{className:"View"},r.a.createElement("button",{key:0,onClick:e.onSubmit},"X")),r.a.createElement("div",{className:"SelectView"},r.a.createElement("div",{className:"SelectContainer"},c.map((function(e,t){return r.a.createElement(k,{card:e,key:t,index:t,click:y})}))),r.a.createElement("div",{className:"ButtonDiv"},e.currentPhases.patterns.map((function(e,t){return r.a.createElement("button",{key:t,id:t,onClick:function(n){!function(e,t,n,a){a.preventDefault(),v[t](c,n)?(s[e].deck.length>0?(s[e].deck.forEach((function(e){f.push(e)})),s[e].deck=c):s[e].deck=Object(i.a)(c),l([])):(c.forEach((function(e){f.push(e)})),l([]))}(t,e.funcID,e.size,n)}},e.desc," ",e.size)})))),r.a.createElement("div",{className:"SubContainer"},f.map((function(e,t){return r.a.createElement(k,{card:e,key:t,index:t,click:p})}))),r.a.createElement(A,{holdDeck:s}),r.a.createElement("button",{onClick:function(t){s.reduce((function(e,t){return t.deck.length>0?e&&!0:e&&!1}),!0)?(!function(e){S.emit("PHASE_COMPLETE",e)}(s),Object(T.b)("Phase Completed",{type:"success",autoClose:1e3}),e.onSubmit(t)):Object(T.b)("Must complete all stacks before submission.",{type:"error",autoClose:1e3})}},"Submit Phase")))},I=function(e){var t=e.playerHand,n=e.playerState,c=e.phases,l=Object(a.useState)(!1),u=Object(P.a)(l,2),i=u[0],o=u[1],s=E();Object(a.useEffect)((function(){g()}),[]);var m=function(e){e.preventDefault(),o(!i)},d=function(e){var a;e.preventDefault(),p()&&"DISCARD"==n&&(a=t[e.currentTarget.id],S.emit("DISCARD",a))};return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"CardView"},r.a.createElement("div",{className:p()?"Container Turn":"Container NoGo"},t.map((function(e,t){return r.a.createElement(k,{card:e,key:t,index:t,click:d})})))),i?r.a.createElement(r.a.Fragment,null,r.a.createElement(C,{onSubmit:m,currentPhases:c[s]})):null,r.a.createElement("button",{onClick:m,hidden:!p()},"Submit Phases"))},N=Object(u.b)((function(e){return{playerHand:e.playerHand,playerState:e.playerState,currentPlayer:e.currentPlayer,phases:e.phases}}))(I),O=function(e){return r.a.createElement("div",{className:"Deck",onClick:function(){p()&&"PICKUP"==e.playerState&&S.emit("PICKUP_DECK")}},r.a.createElement("h2",null,"DECK"))},_=function(){var e=f.getState().phases,t=E();return r.a.createElement("div",{className:"PhaseCard"},r.a.createElement("h4",null,"List of Phases"),e.map((function(e,n){return r.a.createElement("h4",null,t==n?">":"",n+1,"."," ",e.patterns.map((function(t,n){return r.a.createElement("span",null,t.desc," ",t.size,n+1<e.patterns.length?",":"")})))})))},j=function(e){var t=e.discardPile,n=e.playerState,a=function(e){p()&&"PICKUP"==n&&S.emit("PICKUP_DISCARD")};return r.a.createElement("div",{className:"Discard"},r.a.createElement(_,null),r.a.createElement("div",{className:"FlexColumn"},r.a.createElement("h3",null,"Discard Pile"),r.a.createElement("div",{className:"DiscardContainer"},t.map((function(e,t){return r.a.createElement(k,{card:e,key:t,index:t,click:a})})))),r.a.createElement(O,{playerState:n}))},U=Object(u.b)((function(e){return{discardPile:e.discardPile,playerState:e.playerState}}))(j),L=function(e){var t=Object(a.useState)([]),n=Object(P.a)(t,2),c=n[0],l=n[1],u=!1;Object(a.useEffect)((function(){l(h())}),[]);var o=function(t,n){var a=e.bundle.stack.funcID,r=c[n],o=u?[c[n]].concat(Object(i.a)(e.bundle.stack.deck)):[].concat(Object(i.a)(e.bundle.stack.deck),[c[n]]);v[a](o,o.length)?(!function(e,t,n,a){S.emit("UPDATE_STACK",{playerID:e,stackIndx:t,newStack:n,newCard:a})}(e.bundle.ownerID,e.bundle.stackIndx,o,r),c.splice(n,1),e.bundle.stack.deck.push(r),l(c)):console.log("BAD CARD")};return r.a.createElement("div",{className:"overlay"},r.a.createElement("button",{onClick:e.onSubmit},"Close"),r.a.createElement("div",{className:"Flex"},r.a.createElement("button",{onClick:function(e){u=!0}},"Front"),r.a.createElement("div",{className:"SubContainer"},e.bundle.stack.deck.map((function(e,t){return r.a.createElement(k,{card:e,index:t})}))),r.a.createElement("button",{onClick:function(e){u=!1}},"Back")),r.a.createElement("div",{className:"SubContainer"},c.map((function(e,t){return r.a.createElement(k,{card:e,index:t,click:function(e){o(0,t)}})}))))},w=function(e){var t=e.playerList,n=Object(a.useState)(!1),c=Object(P.a)(n,2),l=c[0],u=c[1],i=Object(a.useState)({}),o=Object(P.a)(i,2),s=o[0],m=o[1],d=function(e,n,a){if(p()&&function(){var e=f.getState();return"COMPLETE"==e.playerList.find((function(t){return t.id==e.playerID})).phaseState}()){var r=n,c=t.find((function(e){return e.id==n})).phaseStacks[a];u(!l),m({ownerID:r,stack:c,stackIndx:a})}};return r.a.createElement("div",{className:"StacksView"},t.map((function(e,t){return r.a.createElement("div",{key:t,className:"StackUnit"},r.a.createElement("div",null,r.a.createElement("h2",null,e.name),r.a.createElement("h4",null,"phase: ",e.phase)),r.a.createElement("div",{className:"Stack"},e.phaseStacks.map((function(t,n){return r.a.createElement("div",{className:"StackContainer",onClick:function(t){d(0,e.id,n)}},t.deck.map((function(e,t){return r.a.createElement(k,{card:e,index:t})})))}))))})),l?r.a.createElement(L,{bundle:s,onSubmit:function(){u(!l)}}):null)},R=Object(u.b)((function(e){return{playerList:e.playerList}}))(w),H=function(e){var t=e.playerList,n=e.hostID;return r.a.createElement("div",null,r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Players"))),r.a.createElement("tbody",null,t.map((function(e){return r.a.createElement("tr",{key:e.id},r.a.createElement("td",null,""===e.name?e.id:e.name,function(e){return n==e.id}(e)?r.a.createElement("strong",null," Host"):r.a.createElement("strong",null," ",e.STATE)))})))))},x=Object(u.b)((function(e){return{playerList:e.playerList,hostID:e.hostID,playerID:e.playerID}}))(H),F=function(e){e.dispatch,e.playerID,e.playerName,e.Host;return r.a.createElement(r.a.Fragment,null,r.a.createElement(x,null))},G=Object(u.b)((function(e){return{playerName:e.playerName,playerID:e.playerID}}))(F),M=function(e){return{type:"UPDATE_PLAYERSTATE",playerState:e}},W=function(e){var t=e.dispatch,n=e.chatLog,c="";Object(a.useEffect)((function(){var e;e=function(e){!function(e){t(function(e){return{type:"UPDATE_CHAT",msg:e}}(e)),document.getElementById("dummy").scrollIntoView({behavior:"smooth"})}(e)},S.on("NEW_MSG",(function(t){e(t)}))}),[]);return r.a.createElement("div",{className:"Chat"},r.a.createElement("div",{className:"ChatWindow",id:"chatwindowdiv"},n.map((function(e){return r.a.createElement("h2",null,e)})),r.a.createElement("div",{id:"dummy"})),r.a.createElement("form",{onSubmit:function(e){var t;e.preventDefault(),t=f.getState().playerName+": "+c,S.emit("ROOM_MSG",t),document.getElementById("chatbar").value=""}},r.a.createElement("label",null,"Message:",r.a.createElement("input",{id:"chatbar",type:"text",placeholder:"Type here",onChange:function(e){c=e.target.value}})),r.a.createElement("input",{type:"submit",value:"Submit"})))},Y=Object(u.b)((function(e){return{chatLog:e.chatLog}}))(W),K=function(e){var t="";return r.a.createElement("div",{className:"overlay"},r.a.createElement("form",{className:"nameChangeForm"},r.a.createElement("input",{type:"text",onChange:function(e){t=e.target.value},placeholder:"Enter Your Name"}),r.a.createElement("button",{onClick:function(n){n.preventDefault(),""!==t&&(e.dispatch(function(e){return{type:"UPDATE_NAME",name:e}}(t)),function(e){S.emit("UPDATE_NAME",e)}(t))}},"Submit")))},B=function(e){var t=e.dispatch,n=e.state,c=function(e){t({type:"UPDATE_HOSTID",hostID:e.hostID}),t({type:"UPDATE_PLAYERLIST",playerList:e.playerList}),t(function(e){return{type:"UPDATE_GAMESTATE",gameState:e}}(e.gameState)),t(function(e){return{type:"UPDATE_TURN",currentPlayer:e}}(e.currentPlayer)),t({type:"UPDATE_PILE",discardPile:e.discardPile}),t({type:"UPDATE_PHASES",phases:e.phases})},l=function(e){t(function(e){return{type:"UPDATE_PLAYERHAND",hand:e}}(e))},u=function(e){t(function(e){return{type:"UPDATE_ID",id:e}}(e))},i=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";t(M(e))},o=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"info";Object(T.b)(e,{autoClose:2e3,type:t})};return Object(a.useEffect)((function(){!function(e,t,n){S.on("ROOM_INFO",(function(t){e(t)})),S.on("PLAYER_ID",(function(e){t(e)})),S.on("NEXT_STATE",(function(){n()})),S.on("NEW_ROUND",(function(){g(),n("PICKUP")})),S.on("connect_error",(function(){alert("There was an error reaching the server. Refresh the page to try again.")})),S.on("disconnect",(function(){alert("You were disconnected. Refresh the page")}))}(c,u,i),function(e){S.on("HAND_REQUEST",(function(t){e(t)}))}(l),function(e){S.on("NOTI",(function(t){e(t)}))}(o)}),[]),r.a.createElement("div",{className:"Game"},"FULL"==n.gameState?r.a.createElement("h1",null,"GAME IN PROGRESS"):"Running"==n.gameState?r.a.createElement(r.a.Fragment,null,r.a.createElement(R,null),r.a.createElement(U,null),r.a.createElement(N,null),r.a.createElement(Y,null)):r.a.createElement(r.a.Fragment,null,""==n.playerName&&"WAITING"==n.gameState?r.a.createElement(K,{className:"overlay",dispatch:t}):null,r.a.createElement(G,null),r.a.createElement(D,null),r.a.createElement(Y,null)))},V=Object(u.b)((function(e){return{state:e}}))(B),z=n(24),J=n(3),X=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(z.b,{to:"/Phase10_Clone/Game",activeClassName:"Game"},"Game"),r.a.createElement(J.c,null,r.a.createElement(J.a,{path:"/"},r.a.createElement(V,null)),r.a.createElement(J.a,{path:"/Home"},r.a.createElement("h2",null,"Hello"))))};l.a.render(r.a.createElement(z.a,null,r.a.createElement(u.a,{store:f},r.a.createElement(T.a,{pauseOnFocusLoss:!1}),r.a.createElement(X,null))),document.getElementById("root"))}},[[53,1,2]]]);
//# sourceMappingURL=main.7f6cc82b.chunk.js.map