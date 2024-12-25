import{u as U,bx as X,e as Y,b2 as Z,r as l,by as L,bz as ee,j as e,F as j,P as te,H as I,bA as re,bB as se,ab as ae,am as R,aq as ie,ar as oe,bC as ne,bD as le,bE as de,bF as ce,bG as g,bH as pe,bI as ue,bJ as u,al as xe,bK as he,B as me}from"./index-Mfjc3LbF.js";import{o as fe}from"./yup-B6qiLbC7.js";import{I as _}from"./XCircle-BFHtgMID.js";import{u as je,S as ge}from"./useSearchParamState-C-salS8K.js";import{P as be,a as Se,C as Ce}from"./progress-BYKeaY3t.js";import{u as Pe}from"./useGetErrors-Bhs_yQR9.js";import{c as we,e as Fe}from"./index.esm-BXtshgbH.js";const Ae=["S.N","Property Name","Action"],ye=we().shape({properties:Fe().min(1,"Select at least one property.")}),Re=()=>{var y,v,E,T,k,B;const H={properties:[]},W=U(),{keyword:b,setKeyword:z}=je(),{mutateAsync:V,isPending:D,isError:S,error:C}=X(),{setValue:c,handleSubmit:G,reset:J,formState:P}=Y({defaultValues:H,resolver:fe(ye)}),{data:x}=Z(),[h,K]=l.useState(null),[p,m]=l.useState([]),[f,$]=l.useState({}),{data:a,isFetching:w,isPending:F,refetch:A}=L({categoryId:h,keyword:b});l.useEffect(()=>{A()},[h,b,A]);const{data:i}=ee();l.useEffect(()=>{i!=null&&i.data&&m(i==null?void 0:i.data.rows.map(t=>({id:t.id,title_en:t.title_en})))},[i==null?void 0:i.data,J]),l.useEffect(()=>{S&&$(Pe(C))},[S,C]);const q=(t,r)=>{m(o=>{var d,N;if(r){const n=(N=(d=a==null?void 0:a.data)==null?void 0:d.rows)==null?void 0:N.find(s=>s.id===t);if(n&&!o.some(s=>s.id===n.id)){const s=[...o,{id:n.id,title_en:n.title_en}];return c("properties",s.map(Q=>Q.id.toString())),s}}else{const n=o.filter(s=>s.id!==t);return c("properties",n.map(s=>s.id.toString())),n}return o})},O=t=>{m(r=>{const o=r.filter(d=>d.id!==t);return c("properties",o.map(d=>d.id.toString())),o})};l.useEffect(()=>{c("properties",p.map(t=>t.id.toString()))},[p,c]);const M=async t=>{(await V({data:{properties:JSON.stringify(t.properties)}})).data.status&&W("/admin/properties/featured")};return e.jsx(j,{direction:"column",gap:8,asChild:!0,children:e.jsxs("form",{onSubmit:G(M),id:"new-arrival-form",noValidate:!0,children:[e.jsx(te,{heading:"Featured",description:"Select properties to add as featured"}),e.jsxs(I,{align:"center",gap:2,w:"full",flexWrap:{base:"wrap",sm:"nowrap"},justify:"space-between",children:[e.jsx(ge,{placeholder:"Search property",onSearch:t=>z(t),maxW:{base:"full",sm:"300px"},w:"full"}),e.jsx(re,{size:"lg",maxW:{base:"full",sm:"300px"},children:e.jsxs(se,{value:h??"",onChange:t=>{const r=t.currentTarget.value;K(r)},children:[e.jsx("option",{value:"",disabled:!0,children:"Select Category"}),(v=(y=x==null?void 0:x.data)==null?void 0:y.rows)==null?void 0:v.map(t=>e.jsx("option",{value:t.id,children:t.name_en},t.id))]})})]}),F||w?e.jsx(j,{height:"10dvh",w:"full",justify:"center",align:"center",children:e.jsx(be,{colorPalette:"primary",w:"full",maxW:"240px",value:null,children:e.jsx(Se,{})})}):((E=a==null?void 0:a.data)==null?void 0:E.count)??!1?e.jsx(I,{flexWrap:"wrap",gap:4,children:(k=(T=a==null?void 0:a.data)==null?void 0:T.rows)==null?void 0:k.map(t=>e.jsx(Ce,{maxW:"200px",name:"properties",colorPalette:"primary",label:t.title_en,checked:p.some(r=>r.id===t.id),onCheckedChange:r=>{q(t.id,r.checked)}},t.id))}):e.jsx(ae,{icon:e.jsx(R,{asChild:!0,boxSize:16,children:e.jsx(_,{})}),title:"No properties found",description:"Select a category to list properties."}),(!F||!w)&&e.jsxs(ie,{children:[e.jsx(oe,{children:e.jsx(ne,{children:e.jsxs(le,{captionSide:"top",children:[((B=P.errors)==null?void 0:B.properties)&&e.jsx(de,{color:"red.500",children:(f==null?void 0:f.properties)??P.errors.properties.message}),e.jsx(ce,{children:e.jsx(g,{children:Ae.map(t=>e.jsx(pe,{textAlign:"center",children:t},t))})}),e.jsx(ue,{children:p.length>0?p.map((t,r)=>e.jsxs(g,{textAlign:"center",children:[e.jsx(u,{textAlign:"center",children:r+1}),e.jsx(u,{textAlign:"center",children:t.title_en}),e.jsx(u,{textAlign:"center",children:e.jsx(xe,{onClick:()=>{O(t.id)},variant:"surface",colorPalette:"red",children:e.jsx(R,{asChild:!0,boxSize:6,children:e.jsx(_,{})})})})]},t.id)):e.jsx(g,{children:e.jsx(u,{py:10,colSpan:3,textAlign:"center",children:"No properties selected"})})})]})})}),e.jsx(he,{children:e.jsx(j,{flexDir:"column",gap:4,w:"full",children:e.jsx(me,{loading:D,loadingText:"Adding...",colorScheme:"primary",type:"submit",form:"new-arrival-form",children:"Submit"})})})]})]})})};export{Re as default};
