import{a as F,j as t,aN as y,u as k,bY as D,r as a,b as P,bZ as B,c as I,F as N,P as R,S as q,d as o,B as T,t as w}from"./index-BVyWgP0Q.js";import{R as G}from"./index-CbALRGXo.js";import{u as L}from"./useGetErrors-Bhs_yQR9.js";import"./index-jbnGfxiJ.js";import"./Trash-0YmnJkgT.js";const Y=()=>{const{id:s}=F();if(!s)return t.jsx(y,{title:"No Statistics Found",description:"Please enter the valid statistics id"});const c={title_en:"",title_np:"",value:"",image:""},f=k(),{mutateAsync:g,isPending:x,isError:d,error:l}=D(),[i,n]=a.useState({});a.useEffect(()=>{n(d?L(l):{})},[d,l]);const{control:r,handleSubmit:b,reset:m}=P({defaultValues:c}),{data:e,refetch:E,isPending:h,isFetching:S}=B(s);a.useEffect(()=>{(async()=>{await E()})()},[s]);const[j,v]=a.useState(!1);a.useEffect(()=>{e&&m({title_en:e.data.title_en,title_np:e.data.title_np,value:e.data.value,image:e.data.image})},[e]);const _=async u=>{const p=w(u);j&&p.append("remove_image","true"),(await g({id:s,data:p})).data.status&&(n({}),m(c),f("/admin/statistics"))};return h||S?t.jsx(I,{}):t.jsxs(N,{flexDir:"column",gap:4,children:[t.jsx(R,{heading:"Edit Statistics",description:"Edit your statistics here"}),t.jsx(q,{columns:{base:1,md:2},gap:4,asChild:!0,children:t.jsxs("form",{id:"statistics-form",onSubmit:b(_),children:[t.jsx(o,{name:"title_en",label:"Title (English)",control:r,required:!0,backendError:i.title_en}),t.jsx(o,{name:"title_np",label:"Title (Nepali)",control:r,required:!0,backendError:i.title_np}),t.jsx(o,{name:"value",label:"Value",control:r,required:!0,backendError:i.value}),t.jsx(G,{name:"image",control:r,options:{accept:{"image/*":[]}},file:(e==null?void 0:e.data.image)??"",backendError:i.image,setRemoveImage:v})]})}),t.jsx(T,{type:"submit",form:"statistics-form",loading:x,children:"Submit"})]})};export{Y as default};
