import { Breadcrumb } from "react-instantsearch-hooks-web";

import { ProductActions } from "./ProductActions";

export function ProductHeader() {
  return (
    <div className="flex items-center justify-between h-16 px-6 bg-white">
      <div id="category-title" className="w-40">
        <Breadcrumb
          attributes={[
            'hierarchicalCategories.lvl0',
            'hierarchicalCategories.lvl1',
            'hierarchicalCategories.lvl2',
          ]}
        />
      </div>

      <ProductActions></ProductActions>
    </div>
  )
}