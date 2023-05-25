const ReviewService = require("../services/review.service.js");

class ReviewController {
  reviewService = new ReviewService();

  //리뷰등록
  createReview = async (req, res, next) => {
    try {
      const { user_id } = res.locals.user;
      const { whisky_id } = req.params;
      const { content } = req.body;

      if (!content) {
        throw new Error("403/리뷰 작성에 실패하였습니다.");
      }

      const whisky = await this.reviewService.findWhiskyById(whisky_id);
      if (!whisky) {
        throw new Error("403/위스키가 존재하지 않습니다.");
      }

      await this.reviewService.createReview(user_id, whisky_id, content);

      res.status(201).json({ message: "리뷰를 작성하였습니다." });
    } catch (error) {
      error.failedApi = "리뷰 작성";
      throw error;
    }
  };

  //리뷰수정
  updateRewiew = async (req, res, next) => {
    try {
      const { user_id } = res.locals.user;
      const { whisky_id, review_id } = req.params;
      const { content } = req.body;

      const whisky = await this.reviewService.findWhiskyById(whisky_id);
      if (!whisky) {
        throw new Error("403/위스키가 존재하지 않습니다.");
      }

      const review = await this.reviewService.findReviewById(review_id);
      if (!review) {
        throw new Error("403/리뷰가 존재하지 않습니다.");
      }

      await this.reviewService.updateRewiew(review_id, content);

      return res.status(200).json({ message: "리뷰를 수정했습니다." });
    } catch (error) {
      error.faiedApi = "리뷰 수정";
      throw error;
    }
  };

  //리뷰삭제
  deleteRewiew = async (req, res, next) => {
    try {
      const { user_id } = res.locals.user;
      const { whisky_id, review_id } = req.params;

      const whisky = await this.reviewService.findWhiskyById(whisky_id);
      if (!whisky) {
        throw new Error("403/위스키가 존재하지 않습니다.");
      }

      const review = await this.reviewService.findReviewById(review_id);
      if (!review) {
        throw new Error("403/리뷰가 존재하지 않습니다.");
      }

      await this.reviewService.deleteRewiew(review_id);

      return res.status(200).json({ message: "리뷰를 삭제하였습니다." });
    } catch (error) {
      error.faiedApi = "리뷰 삭제";
      throw error;
    }
  };
}

module.exports = ReviewController;
