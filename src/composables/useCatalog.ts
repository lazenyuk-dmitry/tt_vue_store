import { getAllProducts } from '@/api/endpoints/products'
import type { ProductItem, ProductsListParams } from '@/api/types/products'
import { debounce } from "perfect-debounce";
import { reactive, ref, watch } from 'vue'

export function useCatalog() {
  const isLoading = ref(false)
  const products = ref<ProductItem[]>([])
  const perPage = 20
  let page = 1
  let total = 0

  const filters = reactive<ProductsListParams>({
    q: '',
    inStock: undefined,
    sort: '',
  });

  const fetch = async () => {
    if (isLoading.value) return
    isLoading.value = true
    const data = await getAllProducts({
      page: page,
      limit: perPage,
      q: filters.q,
      inStock: filters.inStock ? true : undefined,
      sort: filters.sort,
    })
    total = data.total
    isLoading.value = false
    return data
  }

  const load = async () => {
    page = 1
    const data = await fetch()
    products.value = data?.items || []
  }

  const loadDebounced = debounce(load, 300)

  const loadMore = async () => {
    if (products.value.length >= total) return
    page += 1
    const data = await fetch()
    products.value = [...products.value, ...(data?.items || [])]
  }

  if (products.value.length === 0) {
    load()
  }

  watch(() => ({ ...filters }), () => {
    loadDebounced()
  })

  return { products, isLoading, filters, fetch, load, loadMore }
}
