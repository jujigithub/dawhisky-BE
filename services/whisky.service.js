const WhiskyRepository = require("../repositories/whisky.repository");
const {
  Whiskys,
  Reviews,
  StoreWhiskys,
  Stores,
  WhiskyLikes,
  Users,
} = require("../models");

class WhiskyService {
  whiskyRepository = new WhiskyRepository(
    Whiskys,
    Reviews,
    StoreWhiskys,
    Stores,
    WhiskyLikes,
    Users
  );

  //위스키 검색
  searchWhisky = async (keyword) => {
    if (/[a-zA-Z]/.test(keyword)) {
      return await this.whiskyRepository.searchAllWhiskyEng(keyword);
    } else {
      return await this.whiskyRepository.searchAllWhiskyKor(keyword);
    }
  };

  findPaginatedWhiskies = async (offset, pageSize) => {
    return await this.whiskyRepository.findPaginatedWhiskies(offset, pageSize);
  };

  //위스키 상세조회
  whiskyDetail = async (whisky_id, email) => {
    const whiskyLike = await this.whiskyRepository.findOneUser(
      whisky_id,
      email
    );
    let liked = whiskyLike ? true : false;
    const whiskyInfo = await this.whiskyRepository.findOneWhisky(whisky_id);
    return { liked, whiskyInfo };
  };

  //위스키 보유 스토어 조회
  whiskyStore = async (whisky_id) => {
    return await this.whiskyRepository.findAllWhiskyStore(whisky_id);
  };

  //위스키 코멘트 조회
  whiskyComment = async (whisky_id) => {
    return await this.whiskyRepository.findAllWhiskyComment(whisky_id);
  };

  // 위스키정보 생성
  createWhisky = async (whiskyData) => {
    return await this.whiskyRepository.createWhisky(whiskyData);
  };

  //위스키 찾기
  findWhiskyById = async (whisky_id) => {
    return await this.whiskyRepository.findOneWhisky(whisky_id);
  };

  //위스키정보 수정
  updateWhisky = async (whisky_id, whiskyData) => {
    return await this.whiskyRepository.updateWhisky(whisky_id, whiskyData);
  };

  //위스키정보 삭제
  deleteWhisky = async (whisky_id) => {
    await this.whiskyRepository.deleteWhisky(whisky_id);
  };
}

module.exports = WhiskyService;
