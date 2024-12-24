import{u as U,bl as X,b as Y,r as l,bm as Z,bn as L,j as e,F as g,P as ee,H as R,bo as te,bp as re,a1 as se,ac as _,af as ae,ag as ie,bq as oe,br as ne,bs as le,bt as de,bu as j,bv as ce,bw as pe,bx as u,ab as ue,by as xe,B as me}from"./index-CLXe-kly.js";import{o as he}from"./yup-CXomuO52.js";import{I}from"./XCircle-Do5AGi-l.js";import{u as fe,S as ge}from"./useSearchParamState-BEKqq6jB.js";import{P as je,a as be,C as Se}from"./progress-B33DDK7p.js";import{u as Pe}from"./useGetErrors-Bhs_yQR9.js";import{e as Ce}from"./service-category-BDvSVdfZ.js";import{c as we,e as Fe}from"./index.esm-BBqtjLFR.js";const ve=["S.N","Property Name","Action"],ye=we().shape({properties:Fe().min(1,"Select at least one property.")}),Ie=()=>{var y,A,E,T,k,N;const W={properties:[]},H=U(),{keyword:b,setKeyword:z}=fe(),{mutateAsync:V,isPending:$,isError:S,error:P}=X(),{setValue:c,handleSubmit:q,reset:D,formState:C}=Y({defaultValues:W,resolver:he(ye)}),{data:x}=Ce(),[m,G]=l.useState(null),[p,h]=l.useState([]),[f,J]=l.useState({}),{data:a,isFetching:w,isPending:F,refetch:v}=Z({categoryId:m,keyword:b});l.useEffect(()=>{v()},[m,b,v]);const{data:i}=L();l.useEffect(()=>{i!=null&&i.data&&h(i==null?void 0:i.data.rows.map(t=>({id:t.id,title_en:t.title_en})))},[i==null?void 0:i.data,D]),l.useEffect(()=>{S&&J(Pe(P))},[S,P]);const K=(t,r)=>{h(o=>{var d,B;if(r){const n=(B=(d=a==null?void 0:a.data)==null?void 0:d.rows)==null?void 0:B.find(s=>s.id===t);if(n&&!o.some(s=>s.id===n.id)){const s=[...o,{id:n.id,title_en:n.title_en}];return c("properties",s.map(Q=>Q.id.toString())),s}}else{const n=o.filter(s=>s.id!==t);return c("properties",n.map(s=>s.id.toString())),n}return o})},O=t=>{h(r=>{const o=r.filter(d=>d.id!==t);return c("properties",o.map(d=>d.id.toString())),o})};l.useEffect(()=>{c("properties",p.map(t=>t.id.toString()))},[p,c]);const M=async t=>{(await V({data:{properties:JSON.stringify(t.properties)}})).data.status&&H("/admin/properties/featured")};return e.jsx(g,{direction:"column",gap:8,asChild:!0,children:e.jsxs("form",{onSubmit:q(M),id:"new-arrival-form",noValidate:!0,children:[e.jsx(ee,{heading:"Featured",description:"Select properties to add as featured"}),e.jsxs(R,{align:"center",gap:2,w:"full",flexWrap:{base:"wrap",sm:"nowrap"},justify:"space-between",children:[e.jsx(ge,{placeholder:"Search property",onSearch:t=>z(t),maxW:{base:"full",sm:"300px"},w:"full"}),e.jsx(te,{size:"lg",maxW:{base:"full",sm:"300px"},children:e.jsxs(re,{value:m??"",onChange:t=>{const r=t.currentTarget.value;G(r)},children:[e.jsx("option",{value:"",disabled:!0,children:"Select Category"}),(A=(y=x==null?void 0:x.data)==null?void 0:y.rows)==null?void 0:A.map(t=>e.jsx("option",{value:t.id,children:t.name_en},t.id))]})})]}),F||w?e.jsx(g,{height:"10dvh",w:"full",justify:"center",align:"center",children:e.jsx(je,{colorPalette:"primary",w:"full",maxW:"240px",value:null,children:e.jsx(be,{})})}):((E=a==null?void 0:a.data)==null?void 0:E.count)??!1?e.jsx(R,{flexWrap:"wrap",gap:4,children:(k=(T=a==null?void 0:a.data)==null?void 0:T.rows)==null?void 0:k.map(t=>e.jsx(Se,{maxW:"200px",name:"properties",colorPalette:"primary",label:t.title_en,checked:p.some(r=>r.id===t.id),onCheckedChange:r=>{K(t.id,r.checked)}},t.id))}):e.jsx(se,{icon:e.jsx(_,{asChild:!0,boxSize:16,children:e.jsx(I,{})}),title:"No properties found",description:"Select a category to list properties."}),(!F||!w)&&e.jsxs(ae,{children:[e.jsx(ie,{children:e.jsx(oe,{children:e.jsxs(ne,{captionSide:"top",children:[((N=C.errors)==null?void 0:N.properties)&&e.jsx(le,{color:"red.500",children:(f==null?void 0:f.properties)??C.errors.properties.message}),e.jsx(de,{children:e.jsx(j,{children:ve.map(t=>e.jsx(ce,{textAlign:"center",children:t},t))})}),e.jsx(pe,{children:p.length>0?p.map((t,r)=>e.jsxs(j,{textAlign:"center",children:[e.jsx(u,{textAlign:"center",children:r+1}),e.jsx(u,{textAlign:"center",children:t.title_en}),e.jsx(u,{textAlign:"center",children:e.jsx(ue,{onClick:()=>{O(t.id)},variant:"surface",colorPalette:"red",children:e.jsx(_,{asChild:!0,boxSize:6,children:e.jsx(I,{})})})})]},t.id)):e.jsx(j,{children:e.jsx(u,{py:10,colSpan:3,textAlign:"center",children:"No properties selected"})})})]})})}),e.jsx(xe,{children:e.jsx(g,{flexDir:"column",gap:4,w:"full",children:e.jsx(me,{loading:$,loadingText:"Adding...",colorScheme:"primary",type:"submit",form:"new-arrival-form",children:"Submit"})})})]})]})})};export{Ie as default};
