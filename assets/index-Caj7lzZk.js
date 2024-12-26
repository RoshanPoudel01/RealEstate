import{u as U,bK as X,e as Y,b2 as Z,r as l,bv as L,bL as ee,j as e,F as j,P as te,H as R,bx as ae,by as se,ab as re,am as _,aq as ie,ar as oe,bz as ne,bA as le,bB as de,bC as ce,bD as g,bE as pe,bF as ue,bG as u,al as xe,bH as he,B as me}from"./index-B7CtynUu.js";import{o as fe}from"./yup-B6ZbJh98.js";import{I as H}from"./XCircle-anq8D9ib.js";import{u as je,S as ge}from"./useSearchParamState-BBQFeMj4.js";import{P as be,a as Se,C as Ce}from"./progress-BT_bQ5yW.js";import{u as we}from"./useGetErrors-Bhs_yQR9.js";import{c as Pe,e as Ae}from"./index.esm-BcAE_Ete.js";const ve=["S.N","Property Name","Action"],ye=Pe().shape({properties:Ae().min(1,"Select at least one property.")}),_e=()=>{var y,N,E,F,T,k;const I={properties:[]},W=U(),{mutateAsync:z,isPending:V,isError:b,error:S}=X(),{setValue:c,handleSubmit:D,reset:G,formState:C}=Y({defaultValues:I,resolver:fe(ye)}),{keyword:w,setKeyword:K}=je(),{data:x}=Z(),[h,$]=l.useState(null),[p,m]=l.useState([]),[f,q]=l.useState({}),{data:r,isFetching:P,isPending:A,refetch:v}=L({categoryId:h,keyword:w});l.useEffect(()=>{v()},[h,w,v]);const{data:i}=ee();l.useEffect(()=>{i!=null&&i.data&&m(i==null?void 0:i.data.rows.map(t=>({id:t.id,title_en:t.title_en})))},[i==null?void 0:i.data,G]),l.useEffect(()=>{b&&q(we(S))},[b,S]);const J=(t,a)=>{m(o=>{var d,B;if(a){const n=(B=(d=r==null?void 0:r.data)==null?void 0:d.rows)==null?void 0:B.find(s=>s.id===t);if(n&&!o.some(s=>s.id===n.id)){const s=[...o,{id:n.id,title_en:n.title_en}];return c("properties",s.map(Q=>Q.id.toString())),s}}else{const n=o.filter(s=>s.id!==t);return c("properties",n.map(s=>s.id.toString())),n}return o})},O=t=>{m(a=>{const o=a.filter(d=>d.id!==t);return c("properties",o.map(d=>d.id.toString())),o})};l.useEffect(()=>{c("properties",p.map(t=>t.id.toString()))},[p,c]);const M=async t=>{(await z({data:{properties:JSON.stringify(t.properties)}})).data.status&&W("/admin/properties/new")};return e.jsx(j,{direction:"column",gap:8,asChild:!0,children:e.jsxs("form",{onSubmit:D(M),id:"new-arrival-form",noValidate:!0,children:[e.jsx(te,{heading:"New",description:"Select properties to add as new"}),e.jsxs(R,{align:"center",gap:2,w:"full",flexWrap:{base:"wrap",sm:"nowrap"},justify:"space-between",children:[e.jsx(ge,{placeholder:"Search property",onSearch:t=>K(t),maxW:{base:"full",sm:"300px"}}),e.jsx(ae,{size:"lg",maxW:{base:"full",sm:"300px"},children:e.jsxs(se,{value:h??"",onChange:t=>{const a=t.currentTarget.value;$(a)},children:[e.jsx("option",{value:"",disabled:!0,children:"Select Category"}),(N=(y=x==null?void 0:x.data)==null?void 0:y.rows)==null?void 0:N.map(t=>e.jsx("option",{value:t.id,children:t.name_en},t.id))]})})]}),A||P?e.jsx(j,{height:"10dvh",w:"full",justify:"center",align:"center",children:e.jsx(be,{colorPalette:"primary",w:"full",maxW:"240px",value:null,children:e.jsx(Se,{})})}):((E=r==null?void 0:r.data)==null?void 0:E.count)??!1?e.jsx(R,{flexWrap:"wrap",gap:4,children:(T=(F=r==null?void 0:r.data)==null?void 0:F.rows)==null?void 0:T.map(t=>e.jsx(Ce,{maxW:"200px",colorPalette:"primary",name:"properties",label:t.title_en,checked:p.some(a=>a.id===t.id),onCheckedChange:a=>{J(t.id,a.checked)}},t.id))}):e.jsx(re,{icon:e.jsx(_,{asChild:!0,boxSize:16,children:e.jsx(H,{})}),title:"No properties found",description:"Select a category to list properties."}),(!A||!P)&&e.jsxs(ie,{children:[e.jsx(oe,{children:e.jsx(ne,{children:e.jsxs(le,{captionSide:"top",children:[((k=C.errors)==null?void 0:k.properties)&&e.jsx(de,{color:"red.500",children:(f==null?void 0:f.properties)??C.errors.properties.message}),e.jsx(ce,{children:e.jsx(g,{children:ve.map(t=>e.jsx(pe,{textAlign:"center",children:t},t))})}),e.jsx(ue,{children:p.length>0?p.map((t,a)=>e.jsxs(g,{textAlign:"center",children:[e.jsx(u,{textAlign:"center",children:a+1}),e.jsx(u,{textAlign:"center",children:t.title_en}),e.jsx(u,{textAlign:"center",children:e.jsx(xe,{onClick:()=>{O(t.id)},variant:"surface",colorPalette:"red",children:e.jsx(_,{asChild:!0,boxSize:6,children:e.jsx(H,{})})})})]},t.id)):e.jsx(g,{children:e.jsx(u,{py:10,colSpan:3,textAlign:"center",children:"No properties selected"})})})]})})}),e.jsx(he,{children:e.jsx(j,{flexDir:"column",gap:4,w:"full",children:e.jsx(me,{loading:V,loadingText:"Adding...",colorScheme:"primary",type:"submit",form:"new-arrival-form",children:"Submit"})})})]})]})})};export{_e as default};