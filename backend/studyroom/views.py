#backend/studyroom/views.py
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q
from resist.models import Classroom, Reservation

@csrf_exempt
def search_studyroom(request):
    if request.method == 'POST':
        try:
            # POST 데이터 파싱
            room_number = request.POST.get('room_number', '')

            print("\n=== 받은 파라미터 ===")
            print(f"room={room_number}")

            # room_number가 정확히 일치하는 경우만 조회
            query = Q()
            if room_number:
                query = Q(classroom__room_number=room_number)

            # select_related로 classroom 정보까지 함께 조회
            reservations = Reservation.objects.select_related('classroom').filter(query) if query else Reservation.objects.select_related('classroom').all()
            
            print("\n=== resist_reservation 테이블 데이터 ===")
            print(f"조회된 데이터 수: {reservations.count()}")
            print(f"실행된 SQL: {reservations.query}")

            # 예약 데이터와 강의실 정보 출력
            for reservation in reservations:
                print(f"""
                Reservation ID: {reservation.id}
                Building Name: {reservation.classroom.building_name}
                Room Number: {reservation.classroom.room_number}
                """)

            results = [{
                'id': reservation.id,
                'building_name': reservation.classroom.building_name,
                'room_number': reservation.classroom.room_number
            } for reservation in reservations]

            return JsonResponse({
                'status': 'success',
                'count': len(results),
                'data': results
            })

        except Exception as e:
            print(f"에러 발생: {str(e)}")
            return JsonResponse({
                'status': 'error',
                'message': str(e)
            }, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def attend_studyroom(request, reservation_id):
    if request.method == 'POST':
        try:
            # 해당 ID의 예약 조회
            reservation = Reservation.objects.get(id=reservation_id)
            
            print(f"\n=== 현재 예약 데이터 ===")
            print(f"ID: {reservation.id}")
            print(f"Attendees Count: {reservation.attendees_count}")
            print(f"Start Time: {reservation.start_time}")
            print(f"End Time: {reservation.end_time}")
            
            # 날짜 데이터는 건드리지 않고 attendees_count만 업데이트
            if reservation.attendees_count is None:
                reservation.attendees_count = 0
            
            # attendees_count 필드만 업데이트
            Reservation.objects.filter(id=reservation_id).update(
                attendees_count=reservation.attendees_count + 1
            )
            
            # 업데이트된 데이터 다시 조회
            reservation.refresh_from_db()
            
            print(f"\n=== 참석자 수 업데이트 ===")
            print(f"Updated attendees_count: {reservation.attendees_count}")

            return JsonResponse({
                'status': 'success',
                'message': 'Successfully updated attendance',
                'attendees_count': reservation.attendees_count
            }, status=200)

        except Reservation.DoesNotExist:
            return JsonResponse({
                'status': 'error',
                'message': 'Reservation not found'
            }, status=404)
        except Exception as e:
            print(f"에러 발생: {str(e)}")
            return JsonResponse({
                'status': 'error',
                'message': str(e)
            }, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=405)
# Create your views here.