import{u as w,j as a,P as D,D as P,H as f,B as A}from"./index-Dbk5Kekq.js";import{A as G}from"./ActionColumn-Cr9PYN4K.js";import{u as K,S as H}from"./useSearchParamState-CPxmmP4R.js";import{u as _,a as k}from"./service-gallery-BI9i-238.js";import"./DeleteAlert-BSPeLUmb.js";import"./Trash-BjDGnoUu.js";const b=()=>{var r,o,i,d,c,l;const{pageIndex:t,setPageIndex:p,keyword:y,setKeyword:g}=K(),n=w(),h=[{header:"S.N",accessorKey:"s.n",cell:({row:s})=>(t-1)*10+s.index+1},{header:"Title (En)",accessorKey:"title_en"},{header:"Title (Np)",accessorKey:"title_np"},{header:"Display Order",accessorKey:"display_order"},{header:"Actions",accessorKey:"actions",cell:({row:s})=>{const{id:u}=s.original,{mutateAsync:j,isPending:S}=k();return a.jsx(G,{handleEdit:()=>n(`edit/${u}`),handleDelete:async()=>{await j({id:u})},isDeleteLoading:S,deleteHeading:"Delete Gallery",deleteMessage:"Are you sure you want to delete this gallery?"})}}],{data:e,isPending:m,isFetching:x}=_({page:t,keyword:y});return a.jsxs(a.Fragment,{children:[a.jsx(D,{heading:"Gallery",description:"Manage your gallery images here"}),a.jsx(P,{columns:h,data:((r=e==null?void 0:e.data)==null?void 0:r.rows)??[],isLoading:m||x,count:((o=e==null?void 0:e.data)==null?void 0:o.count)??0,pagination:{manual:!0,pageCount:((d=(i=e==null?void 0:e.data)==null?void 0:i.pagination)==null?void 0:d.last_page)??0,totalRows:((l=(c=e==null?void 0:e.data)==null?void 0:c.pagination)==null?void 0:l.total)??0,pageParams:{pageIndex:t,setPageIndex:p}},children:a.jsxs(f,{justify:"space-between",gap:4,children:[a.jsx(H,{placeholder:"Search",onSearch:g}),a.jsx(A,{onClick:()=>n("create"),children:"Add"})]})})]})};export{b as default};
