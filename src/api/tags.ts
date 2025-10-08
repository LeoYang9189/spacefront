import request from "@/utils/request";

// 标签列表
export function fetchTags() {
  return request.get({
    url: "/fr/page/pageConfiguration",
    params: { pageCode: "tags" },
  });
}

// 标签类型列表
export function fetchTagTypes() {
  return request.get({
    url: "/fr/page/pageConfiguration",
    params: { pageCode: "tagTypes" },
  });
}
