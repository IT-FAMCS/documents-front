import { fetchGet } from "../api/FetchGet";
import { fetchPost } from "../api/FetchPost";
import { MEMBERS_ADD, MEMBERS_DELETE, MEMBERS_GET } from "../constants/apiUrls";
import { MemberInfo } from "../interfaces/memberInfo";

export default function useMembers() {
  async function getMembers() {
    return await fetchGet(MEMBERS_GET);
  }

  async function getMemberById({ id }: { id: number }) {
    return await fetchGet(MEMBERS_GET + "/" + id);
  }

  async function addMember({ data }: { data: MemberInfo }) {
    return await fetchPost(MEMBERS_ADD, data);
  }

  async function deleteMember({ id }: { id: number }) {
    return await fetchPost(MEMBERS_DELETE, id);
  }

  return { getMembers, addMember, deleteMember, getMemberById };
}
