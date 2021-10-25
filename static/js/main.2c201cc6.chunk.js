(this["webpackJsonpgoit-react-hw-03-image-finder"]=this["webpackJsonpgoit-react-hw-03-image-finder"]||[]).push([[0],{11:function(e,t,a){e.exports={ImageGalleryItem:"ImageGalleryItem_ImageGalleryItem__2PaM5",ImageGalleryItemImage:"ImageGalleryItem_ImageGalleryItemImage__1dTac"}},12:function(e,t,a){e.exports={Overlay:"Modal_Overlay__3WI-V",Modal:"Modal_Modal__2SsBV"}},14:function(e,t,a){e.exports={ImageGallery:"ImageGallery_ImageGallery__3_rty"}},15:function(e,t,a){e.exports={Button:"Button_Button__Ka68f"}},21:function(e,t,a){},45:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(8),c=a.n(o),i=(a(21),a(13)),s=a(3),l=a(4),u=a(6),m=a(5),h=a(9),d=(a(22),a(23),a(2)),g=a.n(d),p=a(7),j=a.n(p),b=a(1),f=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={inputValue:""},e.handleChange=function(t){e.setState({inputValue:t.currentTarget.value.toLowerCase().trim()})},e.handleSubmit=function(t){if(t.preventDefault(),""===t.target[1].value.trim())return h.b.error("Enter name of picture you are looking for!");e.props.onSubmit(e.state.inputValue),e.setState({inputValue:""})},e}return Object(l.a)(a,[{key:"render",value:function(){return Object(b.jsx)("header",{className:j.a.Searchbar,children:Object(b.jsxs)("form",{onSubmit:this.handleSubmit,className:j.a.SearchForm,children:[Object(b.jsx)("button",{type:"submit",className:j.a.SearchFormButton,children:Object(b.jsx)("span",{className:j.a.SearchFormButtonLabel,children:"Search"})}),Object(b.jsx)("input",{name:"inputValue",value:this.state.inputValue,onChange:this.handleChange,className:j.a.SearchFormInput,type:"text",autoComplete:"off",autoFocus:!0,placeholder:"Search images and photos"})]})})}}]),a}(n.Component);f.defaultProps={onSubmit:g.a.func.isRequired};var O=f,v=a(11),y=a.n(v);var S=function(e){var t=e.webformatURL,a=e.tags,n=e.largeImageURL,r=e.onOpen;return Object(b.jsx)("li",{className:y.a.ImageGalleryItem,children:Object(b.jsx)("img",{onClick:r,"data-source":n,src:t,alt:a,className:y.a.ImageGalleryItemImage})})},I=a(14),_=a.n(I);var x=function(e){var t=e.imgArr,a=e.onOpen;return Object(b.jsx)("ul",{className:_.a.ImageGallery,onClick:function(e){return a(e.target.dataset.source)},children:t.map((function(e){var t=e.webformatURL,a=e.id,n=e.tags,r=e.largeImageURL;return Object(b.jsx)(S,{id:a,tags:n,webformatURL:t,largeImageURL:r},a)}))})},w=a(15),C=a.n(w);function M(e){var t=e.onClick;return Object(b.jsx)("button",{type:"button",className:C.a.Button,onClick:t,children:"Load More"})}var k=a(16),F=a.n(k),L=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){return Object(b.jsx)(F.a,{type:"Hearts",color:"#85309f",height:80,width:80,timeout:3e3,style:{position:"fixed",top:"50%",left:"47%"}})}}]),a}(n.Component),B=a(12),U=a.n(B),N=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).closeModalByESC=function(t){"Escape"===t.key&&e.props.modalClose()},e}return Object(l.a)(a,[{key:"componentDidMount",value:function(){window.addEventListener("keydown",this.closeModalByESC)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("keydown",this.closeModalByESC)}},{key:"render",value:function(){var e=this.props,t=e.modalImg,a=e.modalClose;return Object(b.jsx)("div",{className:U.a.Overlay,onClick:a,children:Object(b.jsx)("div",{className:U.a.Modal,children:Object(b.jsx)("img",{src:t,alt:""})})})}}]),a}(n.Component);N.defaultProps={modalClose:g.a.func.isRequired};var G=N;var R=function(e,t){return fetch("https://pixabay.com/api/?q=".concat(e,"&page=").concat(t,"&key=").concat("23793880-43251762e8c5681d941546cf6","&image_type=photo&orientation=horizontal&per_page=12")).then((function(t){return t.ok?t.json():Promise.reject(new Error('No pictures "'.concat(e,'" were found')))}))},A="idle",V="pending",E="resolved",D="rejected",P=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={total:[],imgname:"",page:1,imgArr:[],largeImageURL:"",isModalOpen:!1,error:"",status:A,handleLoadeMore:!1},e.getImgFromFetch=function(t,a){R(t,a).then((function(t){if(t.hits.length){var a=t.hits.map((function(e){var t=e.id,a=e.tags;return{id:t,webformatURL:e.webformatURL,tags:a,largeImageURL:e.largeImageURL}}));e.setState((function(e){return{imgArr:[].concat(Object(i.a)(e.imgArr),Object(i.a)(a)),status:E,handleLoadeMore:!0}}))}else alert("No such pictures, try again"),e.setState({error:"Something went wrong, please try again",status:"rejected"});e.scroll()})).catch((function(t){return e.setState({error:t,status:D})}))},e.scroll=function(){window.scrollTo({top:document.documentElement.scrollHeight,behavior:"smooth"})},e.pageIncrement=function(){return e.setState({page:e.state.page+1,status:"pending"})},e.handleSubmit=function(t){e.setState({inputValue:t,page:1})},e.hendelOpenModal=function(t){e.setState({isModalOpen:!0,modalImg:t})},e.hendelCloseModal=function(){e.setState({isModalOpen:!1,modalImg:""})},e}return Object(l.a)(a,[{key:"componentDidUpdate",value:function(e,t){var a=t.inputValue,n=this.state.inputValue,r=this.state.page;a!==n&&(this.setState({imgArr:[],page:1,status:"pending"}),this.getImgFromFetch(n,r)),t.page!==r&&1!==r&&this.getImgFromFetch(n,r)}},{key:"render",value:function(){var e=this.state,t=e.imgArr,a=e.error,n=e.status,r=e.isModalOpen,o=e.modalImg,c=e.handleLoadeMore;return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(h.a,{autoClose:3e3}),Object(b.jsx)(O,{onSubmit:this.handleSubmit}),n===A&&Object(b.jsx)("h2",{className:"invitation",children:"Use Search above!"}),n===V&&Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(x,{imgArr:t,onOpen:this.toggleModalWindow}),Object(b.jsx)(L,{})]}),n===D&&Object(b.jsx)("h1",{children:a.message}),n===E&&Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(x,{imgArr:t,onOpen:this.hendelOpenModal}),c&&Object(b.jsx)(M,{onClick:this.pageIncrement})]}),r&&Object(b.jsx)(G,{modalImg:o,modalClose:this.hendelCloseModal})]})}}]),a}(n.Component),q=P;c.a.render(Object(b.jsx)(r.a.StrictMode,{children:Object(b.jsx)(q,{})}),document.getElementById("root"))},7:function(e,t,a){e.exports={Searchbar:"SearchBar_Searchbar__2mzcr",SearchForm:"SearchBar_SearchForm___ywuu",SearchFormButton:"SearchBar_SearchFormButton__bXkGe",SearchFormButtonLabel:"SearchBar_SearchFormButtonLabel__22KUj",SearchFormInput:"SearchBar_SearchFormInput__3oCDe"}}},[[45,1,2]]]);
//# sourceMappingURL=main.2c201cc6.chunk.js.map